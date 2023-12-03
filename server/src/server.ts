import express from 'express'
const cors = require('cors')

import userRouter from "./routes/userRoutes"
import authRoutes from './routes/authRoutes'

const app = express()
const PORT = 3333

app.use(express.json())
app.use(cors())

app.use('/', authRoutes)
app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`)
}) 