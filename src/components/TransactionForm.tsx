import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { TransactionType, CreateTransactionDto } from "../types/transaction";
import { ERROR_MESSAGES } from "../constants/messages";

interface TransactionFormProps {
  onSubmit: (transaction: CreateTransactionDto) => void;
}

interface ValidationErrors {
  date?: string;
  description?: string;
  amount?: string;
  type?: string;
}

const initialValues: CreateTransactionDto = {
  date: new Date().toISOString().split("T")[0],
  description: "",
  amount: 0,
  type: TransactionType.EXPENSE,
};

export const TransactionForm: React.FC<TransactionFormProps> = ({
  onSubmit,
}) => {
  const [values, setValues] = useState<CreateTransactionDto>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (
    fieldValues: Partial<CreateTransactionDto> = values
  ): ValidationErrors => {
    const temp: ValidationErrors = {};

    if ("date" in fieldValues) {
      if (!fieldValues.date) {
        temp.date = ERROR_MESSAGES.FORM_VALIDATION.DATE.REQUIRED;
      }
    }

    if ("description" in fieldValues) {
      if (!fieldValues.description?.trim()) {
        temp.description = ERROR_MESSAGES.FORM_VALIDATION.DESCRIPTION.REQUIRED;
      } else if (fieldValues.description.length < 3) {
        temp.description = ERROR_MESSAGES.FORM_VALIDATION.DESCRIPTION.MIN_LENGTH;
      }
    }

    if ("amount" in fieldValues) {
      const amount = Number(fieldValues.amount);
      if (amount <= 0) {
        temp.amount = ERROR_MESSAGES.FORM_VALIDATION.AMOUNT.POSITIVE;
      } else if (!fieldValues.amount) {
        temp.amount = ERROR_MESSAGES.FORM_VALIDATION.AMOUNT.REQUIRED;
      }
    }

    setErrors(temp);
    return temp;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validate({ [name]: value });
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<TransactionType>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validate({ [name]: value });
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate({ [name]: values[name as keyof CreateTransactionDto] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      date: true,
      description: true,
      amount: true,
      type: true,
    });
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit({
        ...values,
        amount: Number(values.amount),
      });
      setValues(initialValues);
      setTouched({});
    }
  };

  const isFormValid = Object.keys(errors).length === 0;
  console.log(errors);
  return (
    <Stack component="form" onSubmit={handleSubmit} spacing={3}>
      <TextField
        fullWidth
        label="Date"
        type="date"
        name="date"
        value={values.date}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={touched.date && Boolean(errors.date)}
        helperText={touched.date && errors.date}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        value={values.description}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={touched.description && Boolean(errors.description)}
        helperText={touched.description && errors.description}
      />
      <TextField
        fullWidth
        label="Amount"
        type="number"
        name="amount"
        value={values.amount}
        onChange={handleInputChange}
        onBlur={handleBlur}
        inputProps={{ step: "0.01" }}
        error={touched.amount && Boolean(errors.amount)}
        helperText={touched.amount && errors.amount}
      />
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={values.type}
          label="Type"
          onChange={handleSelectChange}
          onBlur={handleBlur}
        >
          <MenuItem value={TransactionType.INCOME}>Income</MenuItem>
          <MenuItem value={TransactionType.EXPENSE}>Expense</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" type="submit" disabled={!isFormValid}>
        Add Transaction
      </Button>
    </Stack>
  );
};
