import { ProductGet } from "../../model/product/getProduct.model"
import { ProductGetOne } from "../../model/product/getProductOne.model"
import { readDb } from "../../../db/db"
import { RESPONSE_MESSAGE } from "../../constant/resp/message"

class ProductCtr {
    public async getProduct(req: any): Promise<any> {
        const reqInit = new ProductGet(req)
        if (!reqInit.userId) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.INVALID_TOKEN
                }
            }
        }

        const getUser = await readDb("user")

        if (getUser === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
            return {
                status: 500,
                data: {
                    msg: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                }
            }
        }

        const findUser = getUser.find((u: any) => u.user_id === reqInit.userId)

        if (!findUser) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.USER_NOT_FOUND
                }
            }
        }

        const getProduct = await readDb("product")

        if (getProduct === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
            return {
                status: 500,
                data: {
                    msg: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                }
            }
        }

        return {
            status: 200,
            data: {
                data: getProduct,
                msg: RESPONSE_MESSAGE.SUCCESS
            }
        }
    }

    public async getProductOne(req: any): Promise<any> {
        const reqInit = new ProductGetOne(req)
        if (reqInit.error) {
            return {
                status: 400,
                data: {
                    msg: reqInit.error
                }
            }
        }

        if (!reqInit.userId) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.INVALID_TOKEN
                }
            }
        }

        const getUser = await readDb("user")

        if (getUser === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
            return {
                status: 500,
                data: {
                    msg: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                }
            }
        }

        const findUser = getUser.find((u: any) => u.user_id === reqInit.userId)

        if (!findUser) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.USER_NOT_FOUND
                }
            }
        }

        const getProduct = await readDb("product")

        if (getProduct === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
            return {
                status: 500,
                data: {
                    msg: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                }
            }
        }

        const findProduct = getProduct.find((p: any) => p.product_id === reqInit.productId)

        if (!findProduct) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.PRODUCT_NOT_FOUND
                }
            }
        }

        return {
            status: 200,
            data: {
                data: findProduct,
                msg: RESPONSE_MESSAGE.SUCCESS
            }
        }
    }
}

export {
    ProductCtr
}