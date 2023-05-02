import * as jwt from 'jsonwebtoken'
import { ONLYNUMBER } from "../../constant/regex/regex"

class OrderPostCreate {
    public token: string
    public productId: number
    public userId: number | undefined
    public error: string | undefined
    public errorExtend: string[]

    constructor(req: any) {
        this.productId = req.body.product_id
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

        if (req.body.product_id) {
            if (!ONLYNUMBER.test(req.body.product_id)) this.errorExtend.push('product_id invalid pattern')
        } else {
            this.errorExtend.push('require product_id')
        }

        if (this.errorExtend.length > 0) this.error = this.errorExtend.join(' , ')
    }
}

export {
    OrderPostCreate
}

