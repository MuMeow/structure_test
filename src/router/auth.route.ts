import { Request, Response, Router } from 'express'
import { AuthCtr } from '@ctr/auth/auth.ctr'

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
    const authCtr = new AuthCtr()
    const result = await authCtr.register(req)
    res.status(result.status).json(result.data)
})

router.post('/login', async (req: Request, res: Response) => {
    const authCtr = new AuthCtr()
    const result = await authCtr.login(req)
    res.status(result.status).json(result.data)
})

export default router