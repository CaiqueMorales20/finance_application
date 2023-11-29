import User from "./IUser"

interface IUserService {
  getAllUsers(): Promise<User[]>
  createUser(name: string, email: string, password: string): Promise<User>
  updateUser(id: number ,name: string, email: string, password: string): Promise<User>
  deleteUser(id: number): Promise<void>
}

export default IUserService