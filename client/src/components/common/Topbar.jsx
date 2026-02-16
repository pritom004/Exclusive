import React from 'react'

const Topbar = () => {
  return (
    <div className='py-2.5 flex flex-wrap px-4 gap-3 items-center justify-center bg-black'>
      <span className='text-gray-50 text-xs sm:text-sm'>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%</span>
      <a href="/products" className='text-xs sm:text-sm font-semibold text-white underline'>ShopNow</a>
    </div>
  )
}

export default Topbar;
