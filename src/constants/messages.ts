export const ERROR_MESSAGES = {
  DATE_RANGE: {
    START_DATE: "Start date cannot be after end date",
    END_DATE: "End date cannot be before start date"
  },
  AMOUNT_RANGE: {
    MIN_AMOUNT: "Min amount cannot be greater than max amount",
    MAX_AMOUNT: "Max amount cannot be less than min amount"
  },
  FORM_VALIDATION: {
    DATE: {
      REQUIRED: "Date is required"
    },
    DESCRIPTION: {
      REQUIRED: "Description is required",
      MIN_LENGTH: "Description must be at least 3 characters"
    },
    AMOUNT: {
      REQUIRED: "Amount is required",
      POSITIVE: "Amount must be greater than 0"
    }
  }
} as const; 