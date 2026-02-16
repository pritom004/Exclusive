import React from 'react'
import { Truck, Headset, BadgeCheck  } from 'lucide-react';


const OrderInfo = () => {
  return (
    <section className='mx-auto max-w-6xl flex gap-6 justify-around py-20 flex-wrap'>
        <nav className='flex flex-col'>
            <Truck className='size-12 self-center mb-4 p-3 bg-black rounded-full text-white outline-8 outline-gray-300'/>
            <h6 className='uppercase font-semibold text-lg'>
                FREE AND FAST DELIVERY
            </h6>
            <p className='text-xs'>
                Free delivery for all orders over $140</p>
        </nav>
         <nav className='flex flex-col justify-center'>
            <Headset className='size-12 self-center mb-4 p-3 bg-black rounded-full text-white outline-8 outline-gray-300'/>
            <h6 className='uppercase font-semibold text-lg'>
                24/7 CUSTOMER SERVICE
            </h6>
            <p className='text-xs'>
                Friendly 24/7 customer support</p>
        </nav>
         <nav className='flex flex-col justify-center'>
            <BadgeCheck className='size-12 self-center mb-4 p-3 bg-black rounded-full text-white outline-8 outline-gray-300'/>
            <h6 className='uppercase font-semibold text-lg'>
                MONEY BACK GUARANTEE
            </h6>
            <p className='text-xs'>
            We return money within 30 days    
            </p>
        </nav>

    </section>
  )
}

export default OrderInfo;
