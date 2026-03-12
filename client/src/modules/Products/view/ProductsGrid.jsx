import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../../redux/slices/productSlice';
import Cart from '../../Home/components/Cart';

const ProductsGrid = ({filter}) => {

    const dispatch = useDispatch();
    const {allProducts} = useSelector(state => state.product);

    useEffect(() => {

        dispatch(fetchAllProducts(filter))
    }, [filter]);

    console.log(allProducts);
    

    return (
    <section>
        <div className='grid grid-cols-3 gap-16'>
            {allProducts && allProducts.length> 0 && allProducts.map((product) => (
                <Cart 
                key={product._id}
                url={product.images[0].url}
                alt={product.images[1].alt}
                name={product.name}
                price={product.price}
                discount={product.discount}
                ratings={product.ratings}
                id={product._id}
                />
            ))}
        </div>
    </section>
  )
}

export default ProductsGrid;
