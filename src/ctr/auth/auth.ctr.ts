import { AuthPostRegister } from "../../model/auth/register.model"
import { AuthPostLogin } from "../../model/auth/login.model"
import { readDb, writeDb } from "../../../db/db"
import { RESPONSE_MESSAGE } from "../../constant/resp/message"
import * as jwt from 'jsonwebtoken'

class AuthCtr {
    public async register(req: any): Promise<any> {
        const reqInit = new AuthPostRegister(req)
        if (reqInit.error) {
            return {
                status: 400,
                data: {
                    msg: reqInit.error
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

        const duplicateUsername = getUser.find((u: any) => u.username === reqInit.username)

        if (duplicateUsername) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.DUPLICATE_USERNAME
                }
            }
        }

        const duplicateFullname = getUser.find((u: any) => u.fullname === reqInit.fullname)

        if (duplicateFullname) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.DUPLICATE_FULLNAME
                }
            }
        }

        const allId = getUser.map((u: any) => u.user_id)
        allId.sort((a: any, b: any) => a - b)

        const insertUser = await writeDb("user", {
            user_id: allId[allId.length - 1] + 1,
            username: reqInit.username,
            password: reqInit.password,
            fullname: reqInit.fullname
        })

        if (insertUser === RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR) {
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
                msg: RESPONSE_MESSAGE.SUCCESS
            }
        }
    }

    public async login(req: any): Promise<any> {
        const reqInit = new AuthPostLogin(req)
        if (reqInit.error) {
            return {
                status: 400,
                data: {
                    msg: reqInit.error
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

        const findUser = getUser.find((u: any) => u.username === reqInit.username)

        if (!findUser) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.USER_NOT_FOUND
                }
            }
        }

        if (findUser.password !== reqInit.password) {
            return {
                status: 400,
                data: {
                    msg: RESPONSE_MESSAGE.WRONG_PASSWORD
                }
            }
        }

        const genToken = jwt.sign(
            {
                user_id: findUser.user_id
            },
            "1234"
        )

        return {
            status: 200,
            data: {
                token: genToken,
                msg: RESPONSE_MESSAGE.SUCCESS
            }
        }
    }
}

export {
    AuthCtr
}