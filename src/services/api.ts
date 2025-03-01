import { Transaction, CreateTransactionDto, TransactionFilter, TransactionSummary } from '../types/transaction';

const API_BASE_URL = 'https://localhost:7002';

const appendFiltersToUrl = (baseUrl: string, filters?: TransactionFilter): string => {
  if (!filters) return baseUrl;
  
  const params = new URLSearchParams();
  
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  if (filters.type !== null && filters.type !== undefined && filters.type !== 'all')
        params.append('type', filters.type.toString());
  if (filters.minAmount) params.append('minAmount', filters.minAmount.toString());
  if (filters.maxAmount) params.append('maxAmount', filters.maxAmount.toString());
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const api = {
  async getTransactions(filters?: TransactionFilter): Promise<Transaction[]> {
    try {
      const url = appendFiltersToUrl(`${API_BASE_URL}/Transactions`, filters);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  async getTransactionSummary(filters?: TransactionFilter): Promise<TransactionSummary> {
    try {
      const url = appendFiltersToUrl(`${API_BASE_URL}/Transactions/summary`, filters);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch transaction summary');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching transaction summary:', error);
      throw error;
    }
  },

  async createTransaction(transaction: CreateTransactionDto): Promise<Transaction> {
    try {
      const response = await fetch(`${API_BASE_URL}/Transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction),
      });
      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }
      return response.json();
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  },
}; 