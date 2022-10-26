import * as React from 'react'
import EmptyTable from './EmptyTable'
import Dinero from 'dinero.js'
import dayjs from 'dayjs'
import { COLORMAP as colorMap, User, type Transaction } from '@/constants'

type DataTableProps = {
  transactions: Transaction[]
  setTransaction: (t: Transaction) => void
  openPanel: boolean
  setOpenPanel: (o: boolean) => void
}

function DataTable({
  transactions,
  setTransaction,
  openPanel,
  setOpenPanel,
}: DataTableProps) {
  return (
    <React.Fragment>
      {!transactions.length ? (
        <EmptyTable />
      ) : (
        transactions.map((transaction: Transaction & Partial<User>) => (
          <tr
            key={transaction.transactionTime}
            className="cursor-pointer hover:bg-slate-100">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.email}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={transaction.merchantIconUrl}
                    alt=""
                  />
                </div>
                <div className="ml-2">
                  <div className="text-sm font-medium text-gray-900">
                    {transaction.merchantName}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {dayjs(transaction.transactionTime).format('DD.MM.YYYY')}
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {Dinero({
                amount: parseInt(transaction.amount) * 100,
                currency: transaction.currency,
              }).toFormat('$0,0.00')}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded ${
                  colorMap[transaction.status]
                } `}>
                {transaction.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a
                onClick={() => {
                  setTransaction(transaction)
                  setOpenPanel(!openPanel)
                }}
                className="text-indigo-600 hover:text-indigo-900">
                View
              </a>
            </td>
          </tr>
        ))
      )}
    </React.Fragment>
  )
}

export default DataTable
