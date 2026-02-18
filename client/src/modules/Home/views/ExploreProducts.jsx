import React, { useEffect } from 'react'
import Button from '../../../components/ui/Button';
import Cart from '../components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExploreProducts } from '../../../redux/slices/productSlice';


const ExploreProducts = () => {

   const {exploreProducts} = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(fetchExploreProducts())
  }, [])


  return (
    <section className="container mx-auto px-4 my-20">
         <div className="flex gap-x-4 items-center mb-9">
        <span className="bg-red-600 w-4.5 h-9 rounded"></span>{" "}
        <h4 className="font-semibold text-red-600 text-lg">Our Products</h4>
      </div>

      
        <h4 className="text-4xl tracking-wider mb-12 font-semibold">
          Explore Our Products
        </h4>
        
        <nav className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-20 gap-y-6'>
        {exploreProducts && exploreProducts?.map((product) => (
             <Cart
                key={product.id}
                url={ product?.images?.[0]?.url}
                price={product.price}
                discount={product.discount}
                alt={product?.images?.[0]?.alt}
                name={product.name}
                ratings={product.ratings}
                reviews={product.reviews}
                id={product._id}
              />
        ))}
        </nav>
       <div className='flex justify-center py-12'>
         <Button><a href="/products">View All Products</a></Button>
       </div>

    </section>
  )
}

export default ExploreProducts;
