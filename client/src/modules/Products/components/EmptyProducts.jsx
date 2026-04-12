import React from 'react'
import { PackageOpen } from 'lucide-react';
const EmptyProducts = () => {

  
    return (
    <div className='flex flex-col items-center grow mt-40'>
     <PackageOpen className='size-36 mx-auto mb-2'/>
      <h1 className='text-center mb-3 text-4xl'>No product found</h1>
      <p className='text-center text-lg text-gray-500'>Try with different filter options</p>
    </div>
  )
}

export default EmptyProducts;
