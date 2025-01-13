export interface Result<T> {
  data?: T;
  success: boolean;
  message: string;
}

export interface Goal {
  id: string;
  title: string;
  amount: number;
  goalAmout: number;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  dueDate: string;
  paid: boolean;
  standingOrder: boolean;
  standingOrderDate: string | null;
}
