import React from 'react'
import Hero from '../modules/Home/views/Hero';
import FlashSaleSection from '../modules/Home/views/FlashSaleSection';
import Categories from '../modules/Home/views/Categories';
import BestSelling from '../modules/Home/views/BestSelling';
import ExploreProducts from '../modules/Home/views/ExploreProducts';
import NewArrival from '../modules/Home/views/NewArrival';
import OrderInfo from '../modules/Home/views/OrderInfo';


const Home = () => {

  

  return (
   <>
   <Hero />
   <FlashSaleSection />
   <Categories />
   <BestSelling />
   <div className='px-4 mx-auto container py-20'>
    <img src='call-to-action-banner.jpeg'/>
   </div>
   <ExploreProducts />
   <NewArrival />
   <OrderInfo />
   </>
  )
}

export default Home;
