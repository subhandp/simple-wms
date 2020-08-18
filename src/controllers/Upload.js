require('dotenv').config()
const cloudinary = require('cloudinary').v2
const multer = require('multer')
const path = require('path');
const datauri = require('datauri/parser');

const mydatauri = new datauri();
const dataUri = req => mydatauri.format(path.extname(req.file.originalname), req.file.buffer);

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadCloudinary = async(req, res) => {
    const file = dataUri(req).content;
    return await cloudinary.uploader.upload(file).then((result) => {
        const image = result.url;
        return { urlImage: image }
    }).catch((error) => {
        throw new Error(error);
    })
}

module.exports = { multerUploads, uploadCloudinary };