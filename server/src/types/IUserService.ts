import User from "./IUser"

interface IUserService {
  getAllUsers(): Promise<User[]>
  createUser(name: string, email: string, password: string): Promise<User>
  updateUser(id: number ,name: string, email: string, password: string): Promise<User>
  deleteUser(id: number): Promise<void>
  createUserEntry(userId: number, title:string, type: string, value: number, categoryIds: number[]): Promise<Entry>
  getAllUserEntry(userId: number): Promise<Entry[]>
  updateEntry(id: number, title:string, type: string, value: number, categories: number[]): Promise<Entry>
  deleteEntry(id: number): Promise<void>
}

export default IUserService