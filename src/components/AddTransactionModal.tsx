import React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import { CreateTransactionDto } from '../types/transaction';
import { TransactionForm } from './TransactionForm';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (transaction: CreateTransactionDto) => void;
}

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ open, onClose, onSubmit }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-transaction-modal"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h3" gutterBottom>
          Add New Transaction
        </Typography>
        <TransactionForm onSubmit={onSubmit} />
      </Box>
    </Modal>
  );
};

export default AddTransactionModal; 