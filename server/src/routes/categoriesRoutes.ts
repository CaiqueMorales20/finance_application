import express, { Request, Response } from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import CategoryServices from '../services/CategoryService'

const categoriesRouter = express.Router()
const categoriesService = new CategoryServices()

categoriesRouter.get('/', verifyToken, async (req: Request, res: Response) => {
  try{
    const categories = await categoriesService.getAllCategories()
    res.status(200).send(categories)
  } catch(err) {
    res.status(400).send(err)
  }
})

categoriesRouter.post('/', verifyToken, async (req: Request, res: Response) => {
  const {name} = req.body

  try{
    const newCategory = await categoriesService.createCategory(name)
    res.status(200).send(newCategory)
  } catch(error) {
    res.status(400).send(error)
  }
})

export default categoriesRouter