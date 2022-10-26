import * as React from 'react'
import { axiosWithAuth, sleep } from '@/utils'

import Pagination from '../Pagination'
import Panel from '../Panel'
import LoadingTable from './LoadingTable'
import DataTable from './DataTable'
import type { Transaction, User } from '@/constants'

export default function TransactionsTable({ filterText, status }: any) {
  const [loading, setLoading] = React.useState(false)
  const [transactions, setTransactions] = React.useState([])
  const [filteredTransactions, setFilteredTransactions] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [openPanel, setOpenPanel] = React.useState(false)
  const [transaction, setTransaction] = React.useState({})
  const [offset, setOffset] = React.useState(0)

  const limit = 10

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
      return { limit, offset, status }
    } else {
      return { limit, offset }
    }
  }
  function filterTransactions() {
    setFilteredTransactions(
      transactions.filter((transaction: any) =>
        transaction.merchantName
          .toLowerCase()
          .includes(filterText.toLowerCase())
      )
    )
  }
  async function getTransactions() {
    setLoading(true)
    await sleep(1000)
    users = await getUsers()
    axiosWithAuth
      .get('/transactions', {
        params: setParams(),
      })
      .then((response) => {
        const transactionsWithUserInfo = response.data.data.map((t: Transaction) => {
          const user = users.find((user: User) => user.id === t.userId)
          return Object.assign(t, {
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
          })
        })
        setTransactions(transactionsWithUserInfo)
        setFilteredTransactions(transactionsWithUserInfo)
        setTotal(response.data.meta.total)
        setLoading(false)
      })
  }

  React.useEffect(() => {
    getTransactions()
  }, [status, offset])
  React.useEffect(() => {
    filterTransactions()
  }, [filterText])
  const handleSpace = (event: KeyboardEvent) => {
    if (event.key === 'space') {
      event.preventDefault()
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
                  <th scope="col" className="table-header">
                    Name
                  </th>
                  <th scope="col" className="table-header">
                    Merchant
                  </th>
                  <th scope="col" className="table-header">
                    Date
                  </th>
                  <th scope="col" className="table-header">
                    Amount
                  </th>
                  <th scope="col" className="table-header">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <LoadingTable />
                ) : (
                  <DataTable
                    transactions={filteredTransactions}
                    setTransaction={setTransaction}
                    openPanel={openPanel}
                    setOpenPanel={setOpenPanel}
                  />
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
