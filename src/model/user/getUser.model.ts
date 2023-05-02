import * as jwt from 'jsonwebtoken'

class UserGet {
    public token: string
    public userId: number | undefined

    constructor(req: any) {
        this.token = req.headers.token
        this.userId = undefined

        if (this.token) {
            const tokenDecode: any = jwt.decode(this.token) as { user_id: number }
            if (tokenDecode !== null) {
                this.userId = tokenDecode.user_id
            }
        }
    }
}

export {
    UserGet
}

