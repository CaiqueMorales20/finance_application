import express, {Request, Response} from 'express'

import UserServices from '../services/UserService'
import User from '../types/IUser'

import { verifyToken } from '../middlewares/verifyToken'

const userRouter = express.Router()
const userService = new UserServices()

userRouter.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const users: User[] = await userService.getAllUsers()
    return res.status(200).send(users)
  } catch(error) {
    res.status(400).send(error)
  }
})

userRouter.post('/', verifyToken, async (req: Request, res: Response) => {
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

userRouter.patch('/:id', verifyToken, async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id)
  const {name, email, password} = req.body

  try{
    const updatedUser = await userService.updateUser(id, name, email, password)
    return res.status(200).send(updatedUser)
  } catch(error) {
    return res.status(400).send(error)
  }
})

userRouter.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id)

  try{
    await userService.deleteUser(id)
    res.status(200).send('User deleted')
  } catch(error) {
    res.status(400).send(error)
  }
})

export default userRouter