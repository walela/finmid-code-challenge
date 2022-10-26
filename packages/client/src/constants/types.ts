export type Values<T> = T[keyof T]

export type User = {
  id: string
  smeId: string
  smeName?: string
  name: string
  email: string
  profileImage: string
  password: string
}
export type Transaction = {
  id: string
  userId: string
  smeId: string
  transactionTime: string // i.e. "2022-08-22T20:34:17.282Z"
  merchantIconUrl: string // i.e. "http://localhost:3200/static/mi-figma.png"
  merchantName: string // "Figma"
  amount: string // "-123.12"
  currency: 'EUR' | 'USD'
  status: TransactionStatus
  rejectionReason: RejectionReason | null
}

export type TransactionWithUserInfo = Transaction & Partial<User>

export const TransactionStatusEnum = {
  Rejected: 'REJECTED',
  Pending: 'PENDING',
  Completed: 'COMPLETED',
  Reversed: 'REVERSED',
} as const

export type TransactionStatus = Values<typeof TransactionStatusEnum>

export const RejectionReasonEnum = {
  NotPermitted: 'NOT_PERMITTED',
  InsufficientFunds: 'INSUFFICIENT_FUNDS',
  CardMonthlyLimitReached: 'CARD_MONTHLY_LIMIT_REACHED',
  CardDailyLimitReached: 'CARD_DAILY_LIMIT_REACHED',
  CardExpired: 'CARD_EXPIRED',
  CardSuspended: 'CARD_SUSPENDED',
  CardNotActive: 'CARD_NOT_ACTIVE',
  IncorrectPin: 'INCORRECT_PIN',
} as const

export type RejectionReason = Values<typeof RejectionReasonEnum>
