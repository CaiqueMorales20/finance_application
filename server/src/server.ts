import express from 'express'
const cors = require('cors')

import userRouter from "./routes/userRoutes"
import authRoutes from './routes/authRoutes'
import categoriesRouter from './routes/categoriesRoutes'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())

app.use('/', authRoutes)
app.use('/users', userRouter)
app.use('/category', categoriesRouter)

app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 3333
})