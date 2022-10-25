/* This example requires Tailwind CSS v2.0+ */
const transactions = [
    {
        "id": "eb25549f-a34a-4727-969c-d0471683e180",
        "userId": "5fb473af-2413-43ee-b899-7a4835ee607f",
        "smeId": "58c0645c-ce36-4395-9658-9a654cd3f3f9",
        "transactionTime": "2022-06-01T14:09:16.542Z",
        "merchantIconUrl": "http://localhost:3000/static/mi-lieferando.png",
        "merchantName": "Lieferando",
        "amount": "-692.84",
        "currency": "EUR",
        "name": "Gandalf the Grey",
        "email": "gandalf.the.grey@test.com",
        "profileImage": "http://localhost:3000/static/gandalf.png",
        "status": "REJECTED",
        "rejectionReason": "CARD_NOT_ACTIVE"
      },
  ]
  
  export default function TransactionsTable() {
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
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Merchant
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <tr key={transaction.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={transaction.profileImage} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                            <div className="text-sm text-gray-500">{transaction.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={transaction.merchantIconUrl} alt="" />
                          </div>
                          <div className="ml-2">
                            <div className="text-sm font-medium text-gray-900">{transaction.merchantName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {transaction.transactionTime}
                        </span>
                      </td>
       
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> {transaction.currency}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        {transaction.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  