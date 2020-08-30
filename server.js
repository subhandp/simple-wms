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
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Webpage = require("./src/helpers/pdf");
const Bull = require('bull');
const sendMailQueue = new Bull('sendMail');
const Email = require("./src/helpers/sendEmail");

var cron = require('node-cron');

const reportMonth = async() => {
    const resultIn = await Product_in.findAll();
    let totalProductIn = 0;
    let totalProductOut = 0;
    resultIn.map((val) => {
        totalProductIn += val.total;
    })
    const resultOut = await Product_out.findAll();
    resultOut.map((val) => {
        totalProductOut += val.total;
    })

    console.log('product in', totalProductIn);
    console.log('product out', totalProductOut);
}

reportMonth();

const url = `http://localhost:3000/api/v1/print/products-in-out`;

cron.schedule('5 * * * * *', async() => {
    const dataEmail = {
        email: process.env.EMAIL_USERNAME
    };
    const options = {
        delay: 1000,
    };
    sendMailQueue.add(dataEmail, options);
    sendMailQueue.process(async(job) => {
        return await Email.sendEmail(
            dataEmail,
            "Hai Sir this your Product Month Report!",
            'product-month-report.pdf',
            await Webpage.generatePDF(url)
        );
    }).then((val) => {
        console.log(val)
    })


});

app.set('views', __dirname + '/src/views');
app.set("view engine", "ejs");

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());

const baseUrl = "/api/v1";

app.use(baseUrl + "/user", passport.authenticate('jwt', { session: false }), routerUsers);
app.use(baseUrl + "/products", passport.authenticate('jwt', { session: false }), routerProducts);
app.use(baseUrl + "/in", passport.authenticate('jwt', { session: false }), routerProductIn);
app.use(baseUrl + "/out", passport.authenticate('jwt', { session: false }), routerProductOut);
app.use(baseUrl + "/auth", routerAuth);
app.get(baseUrl + "/print/products-in-out", async(req, res) => {

    const d = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const resultIn = await Product_in.findAll();
    let totalProductIn = 0;
    let totalProductOut = 0;
    resultIn.map((val) => {
        totalProductIn += val.total;
    })
    const resultOut = await Product_out.findAll();
    resultOut.map((val) => {
        totalProductOut += val.total;
    })

    res.render("report-product-in-out-month", { reports: { totalProductIn: totalProductIn, totalProductOut: totalProductOut, dateNow: months[d.getMonth()] } });
});

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

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PRIVATE_KEY
};

passport.use(new JWTstrategy(options, async(token, done) => {
    try {
        return await done(null, token.user);
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