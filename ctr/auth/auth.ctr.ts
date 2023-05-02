import { AuthRegister } from "@model/auth/register.model"
import { AuthLogin } from "@model/auth/register.model"

class AuthCtr {
    public async register(req: any): Promise<any> {
        const reqInit = new AuthRegister(req)
        if (reqInit.error) {
            return {
                status: 400,
                data: {
                    msg: reqInit.error
                }
            }
        }

        if (user.length === 0) {
            return {
                status: 400,
                data: {
                    msg: "user not found"
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
        const reqInit = new AuthLogin(req)
        if (reqInit.error) {
            return {
                status: 400,
                data: {
                    msg: reqInit.error
                }
            }
        }

        if (user.length === 0) {
            return {
                status: 400,
                data: {
                    msg: "user not found"
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
}

export {
    AuthCtr
}