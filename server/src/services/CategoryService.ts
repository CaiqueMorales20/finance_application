import { prisma } from "../db/prisma";
import ICategoryService from "../types/ICategoryService";

class CategoryServices implements ICategoryService {
  async getAllCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany()
    return categories
  }

  async createCategory(name: string): Promise<Category> {    
    try{
      if(!name) {
        throw new Error('Name is required for creating a category.');
      }

      const newCategory = await prisma.category.create({
        data:{
          name,
        }
      })
      return newCategory
    } catch {
      throw new Error('Error when creating category')
    }
  }
}

export default CategoryServices