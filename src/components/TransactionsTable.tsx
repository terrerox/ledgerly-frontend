import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddTransactionModal from './AddTransactionModal';
import TransactionFilters from './TransactionFilters';
import BalanceSummary from './BalanceSummary';
import { useTransactions } from '../context/TransactionContext';
import { TransactionType, CreateTransactionDto, TransactionFilter } from '../types/transaction';

interface FilterValues {
  startDate: string;
  endDate: string;
  type: 'all' | TransactionType;
  minAmount: string;
  maxAmount: string;
}

const TransactionsTable: React.FC = () => {
  const { transactions, loading, error, fetchTransactions, addTransaction, clearError } = useTransactions();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    startDate: '',
    endDate: '',
    type: 'all',
    minAmount: '',
    maxAmount: '',
  });

  useEffect(() => {
    const apiFilters: TransactionFilter = {
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
      type: filters.type === 'all' ? undefined : filters.type,
      minAmount: filters.minAmount ? parseFloat(filters.minAmount) : undefined,
      maxAmount: filters.maxAmount ? parseFloat(filters.maxAmount) : undefined,
    };
    fetchTransactions(apiFilters);
  }, [fetchTransactions, filters]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTransaction = async (newTransaction: CreateTransactionDto) => {
    await addTransaction(newTransaction);
    handleClose();
  };

  const handleFilterChange = (name: string, value: string | 'all' | TransactionType) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      type: 'all',
      minAmount: '',
      maxAmount: '',
    });
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Recent Transactions
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Transaction
        </Button>
      </Box>

      <BalanceSummary />

      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <AddTransactionModal
        open={open}
        onClose={handleClose}
        onSubmit={handleAddTransaction}
      />

      {loading ? (
        <Typography>Loading transactions...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="transactions table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell align="right">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Typography
                      color={transaction.type === TransactionType.INCOME ? 'success.main' : 'error.main'}
                    >
                      {TransactionType[transaction.type]}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={clearError}
      >
        <Alert severity="error" onClose={clearError}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TransactionsTable; 