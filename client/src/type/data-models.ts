import { ROLE } from "./roles";

export type User = {
  _id: string;
  email: string;
  username: string;
  avatar: string;
  role: ROLE;
}

export type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
}
