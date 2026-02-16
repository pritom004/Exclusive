import React from 'react'
import { Link } from 'react-router'
import Button from '../components/ui/Button'

const NotFound = () => {
  return (
    <div className='container mx-auto py-10 md:py-20 px-4'>
       <h4 className='flex text-sm md:text-base gap-x-3 text-gray-600 mb-6.5'>
        <Link to="/">Home</Link>
        /
        <Link to="/" className='text-black'>404 Error</Link>
    </h4>


    <div className='mt-10 md:mt-20 flex flex-col items-center justify-center'>
    <h2 className='text-4xl text-center md:text-8xl tracking-widest font-semibold mb-8'>404 Not Found</h2>
    <p className='mb-12 text-xs md:text-base'>Your visited page not found. You may go home page</p>
    <Button>
        <Link to="/">
        Back to home page
        </Link>
    </Button>
    </div>

    </div>
  )
}

export default NotFound
