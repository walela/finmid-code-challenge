import { FaceFrownIcon } from '@heroicons/react/24/solid'

function EmptyTable() {
  return (
    <tr className="h-36  w-full">
      <td colSpan={6} className="bg-gray-100">
        <div className="w-full grid place-items-center">
          <div className="flex flex-col gap-2 text-gray-500 items-center">
            <span>
              <FaceFrownIcon className="h-10" />
            </span>
            <h1 className="text-sm">No data for you. Just sadness...</h1>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default EmptyTable
