import React from 'react'
import ReactSkeleton from 'react-loading-skeleton'

const Skeleton = ({count, className}) => {
  return (
    <div className={`w-full ${className}`}>
      <ReactSkeleton count={count} className="h-full w-full" containerClassName="w-full h-full block" />
    </div>
  )
}

export default Skeleton
