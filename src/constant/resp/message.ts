enum RESPONSE_MESSAGE {
    SUCCESS = 'success',
    USER_NOT_FOUND = 'user not found',
    WRONG_PASSWORD = 'wrong password',
    DUPLICATE_USERNAME = 'duplicate username',
    DUPLICATE_FULLNAME = 'duplicate fullname',
    INVALID_TOKEN = 'invalid token',
    INTERNAL_SERVER_ERROR = 'internal server error'
}

export {
    RESPONSE_MESSAGE
}