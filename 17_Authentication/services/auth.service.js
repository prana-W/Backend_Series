const Session = require('../models/session.model')

const setUser = async (sessionId, user) => {
    await Session.create({
        sessionId,
        createdBy: user._id
    })
}

const getUser = async (sessionId) => {
    const sessionObj = await Session.findOne({sessionId})
    return sessionObj
}

module.exports = {
    setUser, getUser
}