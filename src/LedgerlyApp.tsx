import { Container } from '@mui/material'
import TransactionsTable from './components/TransactionsTable'
import { TransactionProvider } from './context/TransactionContext'

const LedgerlyApp = () => {
  return (
    <TransactionProvider>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <TransactionsTable />
      </Container>
    </TransactionProvider>
  )
}

export default LedgerlyApp
