import { prisma } from "../db/prisma"
import User from "../types/IUser"
import IUserService from "../types/IUserService"

class UserServices implements IUserService {
  async getAllUsers(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany()
      return users
    } catch(error) {
      throw error
    }
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    try{
      const newUser = await prisma.user.create({
        data:{
          name,
          email,
          password
        }
      })
      return newUser
    } catch(error) {
      throw error
    }
  }

  async updateUser(id: number, name: string, email: string, password: string): Promise<User> {
    try{
      const updatedUser = await prisma.user.update({
        where: {id},
        data: {
          name,
          email,
          password
        }
      })
      return updatedUser
    } catch(error) {
      throw error
    }
  }

  async deleteUser(id: number): Promise<void> {
    try{
      await prisma.user.delete({
        where: {id}
      })
    } catch(error) {
      throw error
    }
  }
  
} 

export default UserServices