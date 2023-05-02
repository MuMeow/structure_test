import { AuthPostRegister } from "../../model/auth/register.model"
import { AuthPostLogin } from "../../model/auth/login.model"
import { readDb, writeDb } from "../../../db/db"
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

        if (typeof getUser === "string") {
            return {
                status: 500,
                data: {
                    msg: "Internal Server Error"
                }
            }
        }

        const duplicateUsername = getUser.find((u: any) => u.username === reqInit.username)

        if (duplicateUsername) {
            return {
                status: 400,
                data: {
                    msg: "duplicate username"
                }
            }
        }

        const duplicateFullname = getUser.find((u: any) => u.fullname === reqInit.fullname)

        if (duplicateFullname) {
            return {
                status: 400,
                data: {
                    msg: "duplicate fullname"
                }
            }
        }

        const allId = getUser.map((u: any) => u.user_id)
        allId.sort((a: any, b: any) => a - b)

        const insertUser = await writeDb("user", {
            user_id: allId[allId.length - 1].user_id,
            username: reqInit.username,
            password: reqInit.password,
            fullname: reqInit.fullname
        })

        if (insertUser === "Internal Server Error") {
            return {
                status: 500,
                data: {
                    msg: "Internal Server Error"
                }
            }
        }

        return {
            status: 200,
            data: {
                msg: "register success"
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

        if (typeof getUser === "string") {
            return {
                status: 500,
                data: {
                    msg: "Internal Server Error"
                }
            }
        }

        const findUser = getUser.find((u: any) => u.username === reqInit.username)

        if (!findUser) {
            return {
                status: 400,
                data: {
                    msg: "user not found"
                }
            }
        }

        if (findUser.password !== reqInit.password) {
            return {
                status: 400,
                data: {
                    msg: "wrong password"
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
                msg: "login success"
            }
        }
    }
}

export {
    AuthCtr
}