const express = require('express')
const router = express.Router()
const {authenticateUser, authorizePermissions} = require('../middleware/authentication')

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword
} = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);

router.route('/showMe').get(authenticateUser,showCurrentUser); //database check use only
router.route('/updateUserPassword').patch(authenticateUser,updateUserPassword);

router.route('/profile/:id').get(authenticateUser, getSingleUser);

module.exports = router;