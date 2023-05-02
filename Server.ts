

import express from 'express'
import bodyParser from 'body-parser'
import BaseRouter from './router'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({ limit: '10MB' }))

app.use('/', BaseRouter)

export default app
