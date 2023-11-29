import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { NextFunction, Request, Response } from 'express';

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if(!token) {
    return res.status(401).json({message: 'Unauthorized: No token provided' })
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decode) => {
    if (err) {
      return res.status(403).json({message: 'Unauthorized: Invalid token'})
    }
    next()
  })
}

export {verifyToken}