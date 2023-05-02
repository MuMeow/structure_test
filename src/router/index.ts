import { Router, Request, Response, NextFunction } from 'express'
import * as jwt from 'jsonwebtoken'

import AuthRoute from './auth.route'
// import UserRoute from './agent.route'
// import ProductRoute from './product.route'
// import OrderRoute from './order.route'

const router = Router()

const AuthToken = (req: Request, res: Response, next: NextFunction) => {
    const header: { token: string } = req.headers as { token: string }
    if (header.token === '' || header.token === undefined) {
        return res.status(401).json({
            msg: "require token"
        })
    }

    jwt.verify(header.token, "1234", (err: any) => {
        if (err) {
            return res.status(401)
                .json({
                    data: null,
                    code: 401000,
                    devMessage: 'Unauthorized'
                })
        }
        next()
    })
}

router.use('/auth', AuthRoute)
// router.use('/user', AuthToken, UserRoute)
// router.use('/product', AuthToken, ProductRoute)
// router.use('/order', AuthToken, OrderRoute)

export default router
