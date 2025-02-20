export interface User {
  userId?: string;
  username?: string;
  email: string;
  password: string;
}

export interface UserData {
  userId: string;
  username?: string;
  email: string;
}
