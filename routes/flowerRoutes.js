const express = require('express');
const router = express.Router();
const {authenticateUser, authorizePermissions} = require('../middleware/authentication');

const {
    createFlower,
    getAllFlowers,
    getSingleFlower,
    updateFlower,
    deleteFlower
} = require('../controllers/flowerController');
const { getRecommendations } = require('../controllers/recommendationController');

router
    .route('/')
    .post([authenticateUser, authorizePermissions('admin')], createFlower)
    .get(getAllFlowers);

router
    .route('/:id')
    .get(getSingleFlower)
    .patch([authenticateUser, authorizePermissions('admin')], updateFlower)
    .delete([authenticateUser, authorizePermissions('admin')], deleteFlower);

router
    .route('/recommendation').post(getRecommendations);

module.exports = router;