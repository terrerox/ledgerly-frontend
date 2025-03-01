import React, { createContext, useContext, useState, useCallback } from 'react';
import { Transaction, CreateTransactionDto, TransactionFilter, TransactionSummary } from '../types/transaction';
import { api } from '../services/api';

interface TransactionContextData {
  transactions: Transaction[];
  summary: TransactionSummary | null;
  loading: boolean;
  error: string | null;
  fetchTransactions: (filters?: TransactionFilter) => Promise<void>;
  addTransaction: (transaction: CreateTransactionDto) => Promise<void>;
  clearError: () => void;
}

const TransactionContext = createContext<TransactionContextData | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async (filters?: TransactionFilter) => {
    try {
      setLoading(true);
      const [data, summaryData] = await Promise.all([
        api.getTransactions(filters),
        api.getTransactionSummary(filters)
      ]);
      setTransactions(data);
      setSummary(summaryData);
      setError(null);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch transactions';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = useCallback(async (newTransaction: CreateTransactionDto) => {
    try {
      const createdTransaction = await api.createTransaction(newTransaction);
      setTransactions(prev => [...prev, createdTransaction]);
      const summaryData = await api.getTransactionSummary();
      setSummary(summaryData);
      setError(null);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create transaction';
      setError(errorMessage);
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        summary,
        loading,
        error,
        fetchTransactions,
        addTransaction,
        clearError,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}; 