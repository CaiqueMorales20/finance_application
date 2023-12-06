interface ICategoryService {
  getAllCategories(): Promise<Category[]>
  createCategory(name: string): Promise<Category>
}

export default ICategoryService