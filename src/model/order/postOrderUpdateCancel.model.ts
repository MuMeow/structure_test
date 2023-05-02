import * as jwt from 'jsonwebtoken'
import { ONLYNUMBER } from "../../constant/regex/regex"

class OrderPostCancel {
    public token: string
    public orderId: number
    public userId: number | undefined
    public error: string | undefined
    public errorExtend: string[]

    constructor(req: any) {
        this.orderId = req.body.order_id
        this.token = req.headers.token
        this.userId = undefined
        this.error = undefined
        this.errorExtend = []

        if (this.token) {
            const tokenDecode: any = jwt.decode(this.token) as { user_id: number }
            if (tokenDecode !== null) {
                this.userId = tokenDecode.user_id
            }
        }

        if (req.body.order_id) {
            if (!ONLYNUMBER.test(req.body.order_id)) this.errorExtend.push('order_id invalid pattern')
        } else {
            this.errorExtend.push('require order_id')
        }

        if (this.errorExtend.length > 0) this.error = this.errorExtend.join(' , ')
    }
}

export {
    OrderPostCancel
}

