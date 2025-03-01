import React from 'react';
import { Paper, Grid, Typography, Box } from '@mui/material';
import { ArrowUpward, ArrowDownward, AccountBalance } from '@mui/icons-material';
import { useTransactions } from '../context/TransactionContext';

const BalanceSummary: React.FC = () => {
  const { summary } = useTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: 'primary.main', color: 'white' }}>
          <AccountBalance sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="subtitle2">Total Balance</Typography>
            <Typography variant="h6">{formatCurrency(summary?.balance || 0)}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: 'success.main', color: 'white' }}>
          <ArrowUpward sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="subtitle2">Total Income</Typography>
            <Typography variant="h6">{formatCurrency(summary?.income || 0)}</Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', bgcolor: 'error.main', color: 'white' }}>
          <ArrowDownward sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="subtitle2">Total Expenses</Typography>
            <Typography variant="h6">{formatCurrency(summary?.expenses || 0)}</Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BalanceSummary; 