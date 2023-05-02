import { Request, Response, Router } from 'express'
import { UserCtr } from '../ctr/user/user.ctr'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const userCtr = new UserCtr()
    const result = await userCtr.getUser(req)
    res.status(result.status).json(result.data)
})

router.get('/order/history', async (req: Request, res: Response) => {
    const userCtr = new UserCtr()
    const result = await userCtr.getOrder(req)
    res.status(result.status).json(result.data)
})

export default router