const Flower = require('../models/Flower');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');

//admin use only
const createFlower = async (req, res) => {
    req.body.user = req.user.userId;
    const flower = await Flower.create(req.body);
    res.status(StatusCodes.CREATED).json({flower});
};

const getAllFlowers = async (req,res) => {
    const flowers = await Flower.find({});
    res.status(StatusCodes.OK).json({flowers, count: flowers.length});
};

const getSingleFlower = async (req, res) => {
    const {id:flowerId} = req.params;
    const flower = await Flower.findOne({_id:flowerId});

    if(!flower){
        throw new CustomError.NotFoundError(`No flower with id: ${flowerId}`);
    }
    res.status(StatusCodes.OK).json({flower});
};

//admin use only
const updateFlower = async (req, res) => {
    const {id: flowerId} = req.params;

    const flower = await Flower.findOneAndUpdate({_id: flowerId}, req.body, {
        new: true,
        runValidators: true
    });

    if(!flower){
        throw new CustomError.NotFoundError(`No flower with id: ${flowerId}`);
    }
    res.status(StatusCodes.OK).json({flower});
};

//admin use only
const deleteFlower = async (req, res) => {
    const {id: flowerId} = req.params;
    const flower = await Flower.findOne({_id: flowerId});

    if(!flower){
        throw new CustomError.NotFoundError(`No flower with id: ${flowerId}`);
    }

    await flower.deleteOne();
    res.status(StatusCodes.OK).json({msg: 'Sucess! Flower removed'})
};

module.exports = {
    createFlower,
    getAllFlowers,
    getSingleFlower,
    updateFlower,
    deleteFlower
};