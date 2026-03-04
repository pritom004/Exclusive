import React from 'react'
import Button from '../ui/Button'

const ApplyCoupon = ({className}) => {
  return (
    <div className={`flex gap-x-4 items-center ${className}`}>
            <input
              type="text"
              className="border rounded px-4 md:px-5 py-2 md:py-2.5 outline-none"
              placeholder="Coupon Code"
            />
            <Button>Apply Coupon</Button>
    </div>
  )
}

export default ApplyCoupon
