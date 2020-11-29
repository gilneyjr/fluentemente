class Http_Error extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }
}

class Internal_Server_Error extends Http_Error {
    constructor() {
        super(500, 'Internal Server Error')
    }
}

class Signup_Error extends Http_Error {
    constructor(message) {
        super(401, message)
    }
}

class EmailAlreadyExistError extends Http_Error {
    constructor(message) {
        super(403, message)
    }
}

class EmailDoesNotExistError extends Http_Error {
    constructor(message) {
        super(403, message)
    }
}

class IdDoesNotExistError extends Http_Error {
    constructor(message) {
        super(403, message)
    }
}

class PasswordDoesNotMatch extends Http_Error {
    constructor(message) {
        super(403, message)
    }
}

module.exports = {
    Http_Error,
    Internal_Server_Error,
    Signup_Error,
    EmailAlreadyExistError,
    EmailDoesNotExistError,
    IdDoesNotExistError,
    PasswordDoesNotMatch,
}