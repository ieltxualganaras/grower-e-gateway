export interface User {
  _id: string;
  name: string;
  password: string;
  type: UserType;
}

declare enum UserType {
  SERVER,
  FRONTEND
}
