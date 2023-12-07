interface User {
  id: number
  name: string
  email: string
  password: string
}

interface UserInfo extends User {
  totalIncome: number;
  totalOutcome: number;
}


export {UserInfo}
export default User