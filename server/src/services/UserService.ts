import { prisma } from "../db/prisma"

import User, { UserInfo } from "../types/IUser"
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

  async getUserById(id: number): Promise<UserInfo> {
    try {
      const user = await prisma.user.findUnique({where: {id}})

      const entries = await prisma.entry.findMany({
        where: {userId: id}
      })

      const incomeEntries = entries.filter((entry) => entry.type === 'income')
      const totalIncome = incomeEntries.reduce((acc, entry) => acc + entry.value, 0)
      
      const outcomeEntries = entries.filter((entry) => entry.type === 'outcome')
      const totalOutcome = outcomeEntries.reduce((acc, entry) => acc + entry.value, 0)
      
      if(!user) throw new Error('User not found')

      const userInfo = {
        ...user,
        totalIncome,
        totalOutcome
      }

      return userInfo
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

  async createUserEntry(userId: number, title: string, type:string, value:number, categoryIds: number[]): Promise<Entry> {
    try{
      const entry = await prisma.entry.create({
        data: {
          title,
          value,
          type,
          user: {connect: {id: userId}},
          category: { connect: categoryIds.map((categoryId) => ({ id: categoryId })) }
        },
      })
      return entry
    } catch(error){
      throw(error)
    }
  }

  async getAllUserEntry(userId: number): Promise<Entry[]> {
    try{
      const entries = await prisma.entry.findMany({
        where: {userId},
        include: {
          category: true
        }
      })
      return entries
    } catch(error) {
      throw error
    }
  }

  async updateEntry(id: number, title: string, type:string, value:number, categories: number[]): Promise<Entry> {

    interface UpdateEntryData {
      title: string;
      value: number;
      type: string;
      category?: { set: { id: number }[] };
    }

    const updateData: UpdateEntryData = {
      title,
      value,
      type,
    };
    
    if (categories.length > 0) {
      updateData.category = {
        set: categories.map((categoryId) => ({ id: categoryId })),
      };
    }

    try{
      const entry = await prisma.entry.update({
        where: {id},
        data: updateData,
      })
      return entry
    } catch(error){
      console.error(error)
      throw(error)
    }
  }

  async deleteEntry(id: number): Promise<void> {
    try{
      await prisma.entry.delete({
        where: {id}
      })
    } catch(error){
      throw(error)
    }
  }
  
} 

export default UserServices