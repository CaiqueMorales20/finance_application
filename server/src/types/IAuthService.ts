import User from "./IUser";

interface IAuthService {
  generateToken(user: User): Promise<string>
  login(email: string, password: string): Promise<User | string>
}

export default IAuthService