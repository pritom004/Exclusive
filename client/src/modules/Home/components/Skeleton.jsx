import React from 'react'

const Skeleton = ({count, className}) => {
  return (
  <ul className="rounded-md border border-gray-100 px-4 py-2">
        {
          Array.from({length: count}).fill(0).map((_, index) => (
            <li
             key={index} className={`bg-gray-200/70 h-10 rounded animate-pulse w-full my-4 ${className}`}>
            </li>
          ))
        }
          </ul>
  )
}

export default Skeleton
