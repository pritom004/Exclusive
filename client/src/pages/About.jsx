import React from 'react'
import { Link } from 'react-router';
import OrderInfo from '../modules/Home/views/OrderInfo';

import Metrics from '../modules/About/views/Metrics';
import Team from '../modules/About/views/Team';



const About = () => {
  return (
     <div className='container mx-auto py-16 px-4'>
       <h4 className='flex gap-x-3 text-gray-600 mb-6.5'>
        <Link to="/">Home</Link>
        /
        <Link to="/about" className='text-black'>About</Link>
    </h4>

    <div className='flex justify-between flex-wrap'>
        <nav className='md:pt-10 lg:pt-16'>
            <h5 className='text-5xl mb-6 font-semibold'>Our Story</h5>
            <p className='mb-4 max-w-lg'>Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 millions customers across the region.</p>
            <p className='mb-6 max-w-lg'>Exclusive has more than 1 million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.</p>
        </nav>

        <img
        className='max-w-lg mx-auto xl:mx-0 md:max-w-xl lg:max-w-2xl'
        src="/two-ladies.png" alt="two ladies" />
    </div>
<Metrics />
<Team />
<OrderInfo />
    </div>
  )
}

export default About;
