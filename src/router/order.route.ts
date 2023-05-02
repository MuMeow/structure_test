import { Request, Response, Router } from 'express'
import { OrderCtr } from '../ctr/order/order.ctr'

const router = Router()

router.post('/create', async (req: Request, res: Response) => {
    const orderCtr = new OrderCtr()
    const result = await orderCtr.postCreateOrder(req)
    res.status(result.status).json(result.data)
})

router.post('/cancel', async (req: Request, res: Response) => {
    const orderCtr = new OrderCtr()
    const result = await orderCtr.postUpdateCancelOrder(req)
    res.status(result.status).json(result.data)
})

router.get('/', async (req: Request, res: Response) => {
    const orderCtr = new OrderCtr()
    const result = await orderCtr.getOrder(req)
    res.status(result.status).json(result.data)
})

export default router