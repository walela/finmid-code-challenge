import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon as XIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import { COLORMAP as colorMap } from '@/constants'
import type { Transaction, User } from '@/constants'
import { formatCurrency } from '@/utils/currencyFormatter'

type PanelProps = {
  open: boolean
  setOpen: (value: boolean) => void
  transaction: Transaction & Partial<User>
}

export default function Panel({ open, setOpen, transaction }: PanelProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <div className="w-screen max-w-md">
                <div className="h-full mt-16 flex flex-col bg-neutral-50 shadow-md overflow-y-scroll">
                  <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2
                        id="slide-over-heading"
                        className="text-lg font-medium text-gray-900">
                        Transaction Details
                      </h2>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-finmidpurple"
                          onClick={() => setOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Main */}
                  <div>
                    <div className="pb-1 sm:pb-6">
                      <div>
                        <div className="relative h-40 sm:h-56">
                          <img
                            className="absolute h-full w-full object-cover"
                            src={transaction.profileImage}
                            alt=""
                          />
                        </div>
                        <div className="mt-6 px-4 sm:mt-8 sm:flex sm:items-end sm:px-6">
                          <div className="sm:flex-1">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-bold text-xl text-gray-900 sm:text-2xl">
                                  {transaction.name}
                                </h3>
                              </div>
                              <p className="text-sm text-gray-500">
                                {transaction.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                      <dl className="space-y-8 px-4 sm:px-6 sm:space-y-6">
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Merchant
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {transaction.merchantName}
                                </div>
                              </div>
                            </div>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Date
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {' '}
                            {dayjs(transaction.transactionTime).format(
                              'MMMM D, YYYY h:mm A'
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Amount
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                            {formatCurrency(
                              transaction.amount,
                              transaction.currency
                            )}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                            Status
                          </dt>
                          <dd className="mt-1 text-sm sm:col-span-2">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded ${
                                colorMap[transaction.status]
                              } `}>
                              {transaction.status}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
