import React from 'react'
import { Store, DollarSign, Gift, BadgeDollarSign } from "lucide-react";

export const metricsCards = [
  {
    id: 1,
    icon: Store,
    value: "10.5k",
    details: "Sellers active on our site",
  },
  {
    id: 2,
    icon: DollarSign,
    value: "33k",
    details: "Monthly product sale",
  },
  {
    id: 3,
    icon: Gift,
    value: "45.5k",
    details: "Customers active on our site",
  },
  {
    id: 4,
    icon: BadgeDollarSign,
    value: "25k",
    details: "Annual gross sale on our site",
  },
];


const Metrics = () => {
  return (
    <div className='flex gap-8 justify-center my-24'>
     {metricsCards.map((card) => (
        <div key={card.id}
            className='flex flex-col justify-center items-center rounded-md hover:text-white hover:bg-red-600/66 group shadow shadow-gray-200 duration-300 py-8 px-6 min-w-72 h-64 border border-gray-200'
        >
            <card.icon className='size-12 self-center mb-4 p-3 bg-black rounded-full text-white group-hover:text-black group-hover:bg-white duration-300 outline-8 outline-gray-300 group-hover:outline-gray-300/80'/>
            <h6>{card.value}</h6>
            <p>{card.details}</p>
        </div>
      ))}
    </div>
  )
}

export default Metrics;
