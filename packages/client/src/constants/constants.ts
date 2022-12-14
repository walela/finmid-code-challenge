// API `GET` limit
const LIMIT = 16

// Map transaction statuses to tailwind colors
const COLORMAP = {
  PENDING: 'bg-orange-100 text-orange-800',
  COMPLETED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
  REVERSED: 'bg-purple-100 text-purple-800',
}


export { COLORMAP, LIMIT }
