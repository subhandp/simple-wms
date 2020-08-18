require('dotenv').config()
const { Users } = require("../models");
const passport = require('passport');
const jwt = require('jsonwebtoken');


const response = {
    data: [],
    message: "Your Message",
    status: "success",
};


class AuthController {
    static async loginUsers(req, res, next) {
        passport.authenticate('login', async(err, user, info) => {
            try {
                if (err || !user) {
                    const error = new Error(err.message)
                    return next(error.message);
                }
                req.login(user, { session: false }, async(error) => {
                    if (error) return next(error.message)
                    const body = { _id: user._id, email: user.email };
                    const token = jwt.sign({ user: body }, process.env.PRIVATE_KEY);
                    response.status = "ok";
                    response.data = {
                        "token": token
                    };
                    response.message = "success login";
                    return res.status(200).json(response);
                });
            } catch (error) {
                return next(error.message);
            }
        })(req, res, next);
    }

    static async createUsers(req, res) {
        try {
            const createResult = await Users.create(req.body);

            const dataEmail = {
                username: createResult.dataValues.username,
                email: createResult.dataValues.email,
                role: createResult.dataValues.role
            };
            response.data = dataEmail;
            response.message = "Register user success";
            res.status(200).json(response);
        } catch (error) {
            response.data = {}
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }

    }
}




module.exports = AuthController;