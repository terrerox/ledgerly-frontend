export enum TransactionType {
  INCOME,
  EXPENSE
}

export interface TransactionSummary {
  income: number;
  expenses: number;
  balance: number;
}

export interface TransactionFilter {
  startDate?: string;
  endDate?: string;
  type?: TransactionType | 'all';
  minAmount?: number;
  maxAmount?: number;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
}

export interface CreateTransactionDto {
  date: string;
  description: string;
  amount: number;
  type: TransactionType;
} 