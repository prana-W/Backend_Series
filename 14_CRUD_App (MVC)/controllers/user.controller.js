const User = require('../models/user.model')

const handleGetAllUsers = async (req, res) => {

    const allDbUserData = await User.find({})

    res.setHeader('X-MyName', 'Pranaw Kumar') //custom header
    return res.json(allDbUserData)
}

const handleGetUserById = async (req, res) => {

    const user = await User.findById(req.params.createdBy)
    if (!user) {
        return res.status(404).json({status: 'fail', error: 'User not found'})
    }

    res.json([user])
}

const handleCreateUser = async (req, res) => {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({status: 'fail', error: 'Please provide all required fields.'})
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })

    return res.status(201).json({status: 'success', message: `id: ${result._id} User added successfully!`})

}

const handleUpdateUserById = async (req, res) => {

    await User.findByIdAndUpdate(req.params.createdBy, req.body)

    return res.json({status: 'success', message: `User with id ${req.params.createdBy} was updated successfully!`})

}

const handleDeleteUserById = async (req, res) => {

    await User.findByIdAndDelete(req.params.createdBy)
    return res.json({status: 'success', message: `User with id ${req.params.createdBy} was deleted successfully!`})

}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleCreateUser,
    handleUpdateUserById,
    handleDeleteUserById
}
