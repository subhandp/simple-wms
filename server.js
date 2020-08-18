require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const routerUsers = require("./src/routes/users");
const routerProducts = require("./src/routes/products");
const routerProductIn = require("./src/routes/product_in");
const routerProductOut = require("./src/routes/product_out");

const routerAuth = require("./src/routes/auth");

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { Users, Product_in, Products, Product_out } = require("./src/models");
const ProductInController = require('./src/controllers/ProductInController');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Webpage = require("./src/helpers/pdf");

app.set('views', __dirname + '/src/views');
app.set("view engine", "ejs");

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

const baseUrl = "/api/v1";

app.use(baseUrl + "/user", routerUsers);
app.use(baseUrl + "/products", routerProducts);
app.use(baseUrl + "/in", routerProductIn);
app.use(baseUrl + "/out", routerProductOut);
app.use(baseUrl + "/auth", routerAuth);
app.get(baseUrl + "/print/:type/:id", async(req, res) => {
    let type = '';
    if (req.params.type == 'in') {
        const result = await Product_in.findByPk(req.params.id, {
            includes: [
                { model: Products }
            ]
        })

        type = 'in';
        console.log(result);
        res.render("report", { reports: result.dataValues });
    } else if (req.params.type == 'out') {
        const result = await Product_out.findByPk(req.params.id, {
            includes: [
                { model: Products }
            ]
        })
        type = 'out';
        res.render("report", { reports: result.dataValues });
    }

});


passport.use('login', new localStrategy(
    async(username, password, done) => {
        try {
            const user = await Users.findOne({ username });
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            const validate = user.password === password ? true : false;
            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }
            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    }
));

passport.use(new JWTstrategy({
    secretOrKey: process.env.PRIVATE_KEY,
    jwtFromRequest: ExtractJWT.fromHeader('Authorization')
}, async(token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}));


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});