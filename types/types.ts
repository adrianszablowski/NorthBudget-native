import { Models } from "react-native-appwrite";

export interface Result<T> {
  data?: T;
  success: boolean;
  message: string;
}

export type Currency = "USD" | "EUR" | "PLN";

export interface User extends Models.Document {
  avatar: string;
  currency: Currency;
  email: string;
  username: string;
}
export interface Goal extends Models.Document {
  title: string;
  amountCollected: number;
  amountToCollect: number;
  userId: string;
}

export interface Expense extends Models.Document {
  title: string;
  amount: number;
  category: Category;
  dueDate: string;
  paid: boolean;
  standingOrder: boolean;
  standingOrderDate: string | null;
}
export interface Category extends Models.Document {
  title: string;
  user: User;
  expenses: Expense[];
}
