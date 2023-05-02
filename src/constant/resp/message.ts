enum RESPONSE_MESSAGE {
    SUCCESS = 'success',
    USER_NOT_FOUND = 'user not found',
    PRODUCT_NOT_FOUND = 'product not found',
    ORDER_NOT_FOUND = 'order not found',
    CANNOT_CANCEL_NOT_OWN_ORDER = 'can\'t cancel not own order',
    CANNOT_CANCEL_FINISH_CANCEL_ORDER = 'can\'t cancel finish or cancel order',
    WRONG_PASSWORD = 'wrong password',
    DUPLICATE_USERNAME = 'duplicate username',
    DUPLICATE_FULLNAME = 'duplicate fullname',
    INVALID_TOKEN = 'invalid token',
    INTERNAL_SERVER_ERROR = 'internal server error'
}

export {
    RESPONSE_MESSAGE
}