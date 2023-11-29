import express from 'express'
import userRouter from "./routes/userRoutes"

const app = express()
const PORT = 3333

app.use(express.json())

app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`)
}) 