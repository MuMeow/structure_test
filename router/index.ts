import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

import AuthRoute from './auth.route'
// import UserRoute from './agent.route'
// import ProductRoute from './product.route'
// import OrderRoute from './order.route'

const router = Router()

const AuthenToken = (req: Request, res: Response, next: NextFunction) => {
    const header: { token: string } = req.headers as { token: string }
    if (header.token === '')
        return res.status(401)
            .json({
                data: 'require token',
                code: 401000,
                devMessage: 'Unauthorized'
            })

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
// router.use('/user', AuthenToken, UserRoute)
// router.use('/product', AuthenToken, ProductRoute)
// router.use('/order', AuthenToken, OrderRoute)

export default router;
