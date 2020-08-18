require('dotenv').config();
const { Users, Products } = require("../models");

const response = {
    message: "",
    status: "",
    data: []
};

class ProductsController {
    static async getProducts(req, res) {

        try {
            let defaultLimit = req.query.limit ? parseInt(req.query.limit) : parseInt(process.env.PAGING_LIMIT);
            let defaultPage = req.query.page ? parseInt(req.query.limit) : parseInt(process.env.PAGING_PAGE);
            const options = {
                attributes: ['id', 'name', 'stock', 'price'],
                page: defaultPage,
                paginate: defaultLimit,
                include: [
                    { model: Users }
                ]

            }
            const { docs, pages, total } = await Products.paginate(options)

            response.data = {
                data: [...docs],
                totalItems: total,
                totalPages: pages,
                currentPage: defaultPage
            };

            response.message = "Succes get products  data";
            response.status = "ok";
            res.status(200).json(response);
        } catch (error) {
            response.data = [];
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async getProductsById(req, res) {
        try {
            const productsRes = await Products.findByPk(req.params.id, {
                include: [
                    { model: Users }
                ]
            });
            if (!productsRes)
                throw Error('data product not found')
            response.data = productsRes;
            response.message = "Succes get data product by id";
            response.status = "ok";
            res.status(200).json(response);
        } catch (error) {
            response.data = [];
            response.message = "error get data product by id";
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async deleteProductsById(req, res) {
        try {
            const productsRes = await Products.findByPk(req.body.id);
            if (!productsRes)
                throw Error('delete data by id product not found')
            await Products.destroy({ where: { id: req.body.id } });
            response.data = req.body.id;
            response.message = "Succes delete data product by id";
            res.status(200).json(response);
        } catch (error) {
            response.data = [];
            response.message = "error delete data product by id";
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }
    }

    static async updateProducts(req, res) {
        try {
            await Products.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            response.data = req.body;
            console.log(req.body)
            response.message = "Updated data Products by PUT success";
            res.status(200).json(response);
            console.log(response)
        } catch (error) {
            response.data = []
            response.status = "error update Products by PUT";
            response.message = error.message;
            res.status(400).json(response);
            console.log(error);
        }

    }


    static async createProducts(req, res) {
        try {
            const dataImage = await uploadCloudinary(req, res);
            const dataCreate = {...req.body, ...dataImage };
            await Products.create(dataCreate);
            response.data = dataCreate;
            response.message = "create data product success";
            response.status = "ok";
            res.status(200).json(response);
        } catch (error) {
            response.data = undefined
            response.status = "error";
            response.message = error.message;
            res.status(400).json(response);
        }

    }


}

module.exports = ProductsController;