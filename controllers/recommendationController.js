const Flower = require('../models/Flower');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

const getRecommendations = async (req, res) => {
    const {occasion, recipient, feeling} = req.body;

    const flowers = await Flower.find({
        occasion: occasion,
        recipient: recipient,
        feeling: feeling
    });

    if(!flowers){
        throw new CustomError.NotFoundError(`No flower with id: ${flowerId}`);
    }
    res.status(StatusCodes.OK).json({flowers});
};

module.exports = {getRecommendations};