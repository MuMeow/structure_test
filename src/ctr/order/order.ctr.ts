import { OrderPostCreate } from "../../model/order/postOrderCreate.model"
import { OrderPostCancel } from "../../model/order/postOrderUpdateCancel.model"
import { OrderGet } from "../../model/order/getOrder.model"
import { writeDb, updateDb, readDb, } from "../../../db/db"
import { RESPONSE_MESSAGE } from "../../constant/resp/message"
import { ORDER_STATUS } from "../../constant/order/orderStatus"

class OrderCtr {
    public async postCreateOrder(req: any): Promise<any> {
        const reqInit = new OrderPostCreate(req)
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

        const getOrder = await readDb("order")

        if (getOrder === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
            return {
                status: 500,
                data: {
                    msg: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                }
            }
        }

        const allId = getOrder.map((u: any) => u.user_id)
        allId.sort((a: any, b: any) => a - b)

        const insertOrder = await writeDb("order", {
            order_id: allId[allId.length - 1] + 1,
            user_id: reqInit.userId,
            product_id: reqInit.productId,
            status: ORDER_STATUS.WAITING
        })

        if (insertOrder === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
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
                data: {
                    order_id: allId[allId.length - 1] + 1
                },
                msg: RESPONSE_MESSAGE.SUCCESS
            }
        }
    }

    public async postUpdateCancelOrder(req: any): Promise<any> {
        const reqInit = new OrderPostCreate(req)
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

        const getOrder = await readDb("order")

        if (getOrder === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
            return {
                status: 500,
                data: {
                    msg: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                }
            }
        }

        const findOrder = getOrder.find((p: any) => p.order_id === reqInit.orderId)

        if (!findOrder) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.ORDER_NOT_FOUND
                }
            }
        }

        const updateOrder = await updateDb("order", {
            order_id: reqInit.orderId,
            user_id: findOrder.user_id,
            product_id: findOrder.product_id,
            status: ORDER_STATUS.CANCEL
        })

        if (updateOrder === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
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
                data: {
                    order_id: reqInit.orderId
                },
                msg: RESPONSE_MESSAGE.SUCCESS
            }
        }
    }

    public async getOrder(req: any): Promise<any> {
        const reqInit = new OrderPostCreate(req)
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

        const getOrder = await readDb("order")

        if (getOrder === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
            return {
                status: 500,
                data: {
                    msg: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                }
            }
        }

        // get Product for product_name

        const getProduct = await readDb("product")

        if (getProduct === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
            return {
                status: 500,
                data: {
                    msg: RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
                }
            }
        }

        const allOrder: any[] = []

        getOrder.forEach((o: any) => {
            if (o.user_id === reqInit.userId && o.status === ORDER_STATUS.WAITING) {
                const findProduct = getProduct.find((p: any) => p.product_id === o.product_id)
                allOrder.push({
                    order_id: o.order_id,
                    user_id: o.user_id,
                    product_id: o.product_id,
                    product_name: (findProduct) ? findProduct.product_name : null,
                    status: o.status
                })
            }
        })

        return {
            status: 200,
            data: {
                data: allOrder,
                msg: RESPONSE_MESSAGE.SUCCESS
            }
        }
    }
}

export {
    OrderCtr
}