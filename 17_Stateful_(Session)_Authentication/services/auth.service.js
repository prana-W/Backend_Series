const authService = new Map()

// Maps the sessionId with user object
const setUser = (sessionId, user) => {
    authService.set(sessionId, user)
}

// Return user object corresponding to sessionId
const getUser = (sessionId) => {
    return authService.get(sessionId)
}

module.exports = {
    setUser,
    getUser
}