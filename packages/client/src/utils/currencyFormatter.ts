import { Transaction } from '@/constants'

const formatCurrency = (
  amount: string,
  currency: Transaction['currency']
) => {
  switch (currency) {
    case 'EUR':
      return `€${Math.abs(parseFloat(amount))}`
    case 'USD':
      return `$${Math.abs(parseFloat(amount))}`
  }
}

export { formatCurrency }