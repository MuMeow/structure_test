import { UserGet } from "../../model/user/getUser.model"
import { UserGetOrder } from "../../model/user/getOrder.model"
import { readDb } from "../../../db/db"
import { RESPONSE_MESSAGE } from "../../constant/resp/message"
import * as jwt from 'jsonwebtoken'

class UserCtr {
    public async getUser(req: any): Promise<any> {
        const reqInit = new UserGet(req)

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

        return {
            status: 200,
            data: {
                ...findUser,
                msg: RESPONSE_MESSAGE.SUCCESS
            }
        }
    }

    public async getOrder(req: any): Promise<any> {
        const reqInit = new UserGet(req)

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

        const allOrder = getOrder.map((o: any) => o.user_id === reqInit.userId)

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
    UserCtr
}