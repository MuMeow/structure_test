import { AuthPostRegister } from "@model/auth/register.model"
import { AuthPostLogin } from "@model/auth/login.model"

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
        const reqInit = new AuthPostLogin(req)
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