import * as jwt from 'jsonwebtoken'

class OrderGet {
    public token: string
    public userId: number | undefined
    public error: string | undefined

    constructor(req: any) {
        this.token = req.headers.token
        this.userId = undefined

        if (this.token) {
            const tokenDecode: any = jwt.decode(this.token) as { user_id: number }
            if (tokenDecode !== null) {
                this.userId = tokenDecode.user_id
            }
        }}
}

export {
    OrderGet
}

