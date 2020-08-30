const { Users, Products } = require("../models");

const response = {
    data: [],
    message: "",
    status: "",
};

class UsersController {
    static async getUsers(req, res) {
        try {
            const usersRes = await Users.findAll();
            response.data = usersRes;
            response.message = "Succes get users data";
            response.status = "ok";
            res.status(200).json(response);
        } catch (error) {
            response.data = [];
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async getUsersById(req, res) {
        try {
            const usersRes = await Users.findByPk(req.params.id, {
                include: [
                    { model: Products }
                ]
            });
            if (!usersRes)
                throw Error('data users not found')
            response.data = usersRes;
            response.message = "Succes get data user by id";
            response.status = "ok";
            res.status(200).json(response);
        } catch (error) {
            response.data = [];
            response.message = "error get data user by id";
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }



    static async deleteUsersById(req, res) {
        try {
            const usersRes = await Users.findByPk(req.body.id);
            if (!usersRes)
                throw Error('delete data by id user not found')
            await Users.destroy({ where: { id: req.body.id } });
            response.data = req.body.id;
            response.message = "Succes delete data user by id";
            res.status(200).json(response);
        } catch (error) {
            response.data = [];
            response.message = "error delete data user by id";
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async updateUsers(req, res) {
        try {
            await Users.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            response.data = req.body;
            console.log(req.body)
            response.message = "Updated data by PUT success";
            res.status(200).json(response);
            console.log(response)
        } catch (error) {
            response.data = []
            response.status = "error update by PUT";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }

    }

}

module.exports = UsersController;