import * as React from 'react'
import Dinero from 'dinero.js'
import dayjs from 'dayjs'
import { axiosWithAuth } from '@/utils'
import { colorMap, type Transaction } from '@/constants'
import Pagination from '../Pagination'
import EmptyTable from './EmptyTable'
import Panel from '../Panel'


export default function TransactionsTable({ filterText, status }: any) {
  const [filteredTransactions, setFilteredTransactions] = React.useState([])
  const [openPanel, setOpenPanel] = React.useState(false)
  const [transaction, setTransaction] = React.useState({})
  const [total, setTotal] = React.useState(0)
  
  const limit = 10
  const [offset, setOffset] = React.useState(0)
  let users: any = []
  async function getUsers() {
    const response = await axiosWithAuth.get('/users')
    return response.data
  }

  const getPrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit)
    }
  }

  const getNext = () => {
    if (offset + limit < total) {
      setOffset(offset + limit)
    }
  }
  const setParams = () => {
    if (status) {
      return  { limit, offset, status }
    } else {
      return  { limit, offset }
    }
  }

  React.useEffect(() => {
    async function doStuff() {
      users = await getUsers()
      axiosWithAuth
        .get('/transactions', {
          params: setParams(),
        })
        .then((response) => {
          const transactionsWithUserInfo = response.data.data.map((t) => {
            const user = users.find((user: any) => user.id === t.userId)
            return Object.assign(t, {
              name: user.name,
              email: user.email,
              profileImage: user.profileImage,
            })
          })
          setFilteredTransactions(
            transactionsWithUserInfo.filter((transaction: any) =>
              transaction.merchantName
                .toLowerCase()
                .includes(filterText.toLowerCase())
            )
          )
          setTotal(response.data.meta.total)
        })
    }
    doStuff()
  }, [filterText, status, offset])
  const handleSpace = (e) => {
    if (e.keyCode === 32) {
      e.preventDefault()
      setOpenPanel(true)
    }
  }
  React.useEffect(() => {
    window.addEventListener('keydown', (e) => handleSpace(e), false)
    return () => window.removeEventListener('keydown', handleSpace, false)
  }, [])
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {!filteredTransactions.length ? (
                  <EmptyTable />
                ) : (
                  filteredTransactions.map((transaction: Transaction) => (
                    <tr
                      key={transaction.transactionTime}
                      className="cursor-pointer hover:bg-slate-100"
                      onMouseEnter={() => setTransaction(transaction)}>
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
                        {dayjs(transaction.transactionTime).format(
                          'DD.MM.YYYY'
                        )}
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
              </tbody>
            </table>
            {filteredTransactions.length > 0 && (
              <Pagination
                count={filteredTransactions.length}
                offset={offset}
                limit={limit}
                total={total}
                getPrevious={getPrevious}
                getNext={getNext}
              />
            )}
          </div>
        </div>
      </div>
      <Panel
        open={openPanel}
        transaction={transaction}
        setOpen={setOpenPanel}
        closePanel={() => setOpenPanel(false)}
      />
    </div>
  )
}
