import { Request, Response, Router } from 'express'
import { ProductCtr } from '../ctr/product/product.ctr'

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const productCtr = new ProductCtr()
    const result = await productCtr.getProduct(req)
    res.status(result.status).json(result.data)
})

router.get('/one', async (req: Request, res: Response) => {
    const productCtr = new ProductCtr()
    const result = await productCtr.getProductOne(req)
    res.status(result.status).json(result.data)
})

export default router