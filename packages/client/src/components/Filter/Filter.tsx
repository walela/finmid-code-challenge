import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const statusOptions = [
  { name: 'All', value: '' },
  {
    name: 'Pending',
    value: 'PENDING',
  },
  { name: 'Completed', value: 'COMPLETED' },
  { name: 'Rejected', value: 'REJECTED' },
]

function Filter({ setStatus }: any) {
  const [selected, setSelected] = React.useState('')
  return (
    <div className="w-full bg-gray-100 border-t border-b border-gray-100  flex  py-2 my-2">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="bg-white hover:bg-gray-100 px-4 shadow rounded-full text-gray-500 font-semibold text-sm border border-gray-400 py-1">
          Status -&gt; {' '}
          <span className="text-indigo-500 text-sm font-medium">
            {statusOptions.find((status) => status.value === selected)?.name}
          </span>
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="origin-top-right absolute right-0 pt-2 pb-4 mt-1 w-56 rounded-md shadow-xl bg-white ring-1 ring-black  ring-opacity-5 focus:outline-none">
            <div className="border-b border-gray-200 px-4 py-2">
              <h1 className="text-gray-700 text-sm font-semibold">
                Filter by Status
              </h1>
            </div>
            <div className="px-4 flex flex-col gap-4 mt-2">
              {statusOptions.map((status) => (
                <div
                  key={status.name}
                  className="flex gap-1 text-gray-600 text-sm items-center">
                  <input
                    id={status.name.toLowerCase()}
                    name="status"
                    type="radio"
                    value={status.value}
                    defaultChecked={status.value === selected}
                    onChange={() => setSelected(status.value)}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor={status.name.toLowerCase()}
                    className="font-medium text-gray-500">
                    {status.name}
                  </label>
                </div>
              ))}
              <button
                onClick={() => setStatus(selected)}
                className="px-4 bg-finmidpurple text-white py-1 hover:bg-finmidpurple-light rounded shadow">
                Apply
              </button>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default Filter
