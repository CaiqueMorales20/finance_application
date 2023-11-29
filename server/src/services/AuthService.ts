import 'dotenv/config'
import jwt from 'jsonwebtoken'

import { prisma } from "../db/prisma"

import IAuthService from "../types/IAuthService"
import User from "../types/IUser"

class AuthServices implements IAuthService {
  async generateToken(user: User) {
    const secretKey: string | undefined = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error('JWT secret key is not defined')
    }

    const token: string = jwt.sign(user, secretKey, { expiresIn: '1h' });
    return token
  }

  async login(email: string, password: string) {
    try {
      const authUser = await prisma.user.findUnique({
        where: {
          email,
          password
        }
      })
      if(!authUser) return 'User not found'
      return authUser
    } catch(error) {
      throw error
    }
  }

}

export default AuthServices