const express = require('express')
const router = express.Router()

const {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById
} = require('../controllers/user.controller')

// Here we will use router instead of app

// router.get('/', handleGetAllUsers)
// router.post('/', handleCreateUser)

//! This can be written in place of the above two lines
router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser)

router.route('/:userId')
    .get(handleGetUserById)
    .patch(handleUpdateUserById)
    .delete(handleDeleteUserById)

module.exports = router