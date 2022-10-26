export default function Pagination({
  total,
  offset,
  limit,
  getNext,
  getPrevious,
}: any) {
  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{offset + 1}</span> to{' '}
          <span className="font-medium">
            {offset + limit >= total ? total : offset + limit}
          </span>{' '}
          of <span className="font-medium">{total}</span> transactions
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <a
          onClick={getPrevious}
          className="relative cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Previous
        </a>
        <a
          onClick={getNext}
          className="ml-3 relative cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          Next
        </a>
      </div>
    </nav>
  )
}
