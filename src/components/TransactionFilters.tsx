import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import { TransactionType } from "../types/transaction";
import { ERROR_MESSAGES } from "../constants/messages";

type FilterType = "all" | TransactionType;

interface FilterValues {
  startDate: string;
  endDate: string;
  type: FilterType;
  minAmount: string;
  maxAmount: string;
}

interface TransactionFiltersProps {
  filters: FilterValues;
  onFilterChange: (name: string, value: string | FilterType) => void;
  onClearFilters: () => void;
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const handleSelectChange = (e: SelectChangeEvent<FilterType>) => {
    onFilterChange(e.target.name, e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange(e.target.name, e.target.value);
  };

  const isDateRangeInvalid = (): boolean => {
    if (!filters.startDate || !filters.endDate) return false;
    return new Date(filters.startDate) > new Date(filters.endDate);
  };

  const isAmountRangeInvalid = (): boolean => {
    const minAmount = parseFloat(filters.minAmount);
    const maxAmount = parseFloat(filters.maxAmount);
    return !isNaN(minAmount) && !isNaN(maxAmount) && minAmount > maxAmount;
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
      <TextField
        label="Start Date"
        type="date"
        name="startDate"
        value={filters.startDate}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        size="small"
        error={isDateRangeInvalid()}
        helperText={isDateRangeInvalid() ? ERROR_MESSAGES.DATE_RANGE.START_DATE : ""}
      />
      <TextField
        label="End Date"
        type="date"
        name="endDate"
        value={filters.endDate}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        size="small"
        error={isDateRangeInvalid()}
        helperText={isDateRangeInvalid() ? ERROR_MESSAGES.DATE_RANGE.END_DATE : ""}
      />
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>Type</InputLabel>
        <Select<FilterType>
          name="type"
          value={filters.type}
          label="Type"
          onChange={handleSelectChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value={TransactionType.INCOME}>Income</MenuItem>
          <MenuItem value={TransactionType.EXPENSE}>Expense</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Min Amount"
        type="number"
        name="minAmount"
        value={filters.minAmount}
        onChange={handleInputChange}
        size="small"
        inputProps={{ step: "0.01" }}
        error={isAmountRangeInvalid()}
        helperText={isAmountRangeInvalid() ? ERROR_MESSAGES.AMOUNT_RANGE.MIN_AMOUNT : ""}
      />
      <TextField
        label="Max Amount"
        type="number"
        name="maxAmount"
        value={filters.maxAmount}
        onChange={handleInputChange}
        size="small"
        inputProps={{ step: "0.01" }}
        error={isAmountRangeInvalid()}
        helperText={isAmountRangeInvalid() ? ERROR_MESSAGES.AMOUNT_RANGE.MAX_AMOUNT : ""}
      />
      <Button variant="outlined" onClick={onClearFilters} size="small">
        Clear Filters
      </Button>
    </Box>
  );
};

export default TransactionFilters;
