import express, { Request, Response } from 'express'
import AuthServices from '../services/AuthService'
import UserServices from '../services/UserService'

const authRoutes = express.Router()
const authService = new AuthServices()
const userService = new UserServices()

authRoutes.post('/login', async (req: Request, res: Response) => {
  const {email, password} = req.body

  try {
    const authUser = await authService.login(email, password)
    if (authUser === 'User not found') return res.status(400).send(authUser)

    const token = await authService.generateToken(authUser)
    res.status(200).send({
      token,
      ...authUser  
    })
  } catch(error) {
    res.status(400).send(error)
  }
})

authRoutes.post('/create-account', async (req: Request, res: Response) => {
  const {name, email, password, password_confirm} = req.body 

  if (password === password_confirm) {
    try {
      const newUser = await userService.createUser(name, email, password)
      return res.status(200).send(newUser)
    } catch(error) {
      return res.status(400).send(error)
    }
  } 

  return res.status(400).send('Passwords do not match')

})

export default authRoutes