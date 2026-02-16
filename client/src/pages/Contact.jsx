import React from 'react'
import { Phone, Mail } from 'lucide-react';
import { Link } from 'react-router';
import Button from '../components/ui/Button';

const Contact = () => {
  return (
    <div className='max-w-6xl mx-auto py-16 px-4'>
    <h4 className='flex gap-x-3 text-gray-600'>
        <Link to="/">Home</Link>
        /
        <Link to="/contact" className='text-black'>Contact</Link>
    </h4>

    <section className='py-16 flex gap-6.5 flex-wrap'>
        <nav className='px-6 mx-auto max-w-xs py-10 rounded-md shadow space-y-4'>
            <h4 className='flex gap-x-3 items-center text-lg font-semibold'>
            <Phone className='rounded-full size-10 bg-red-600 text-white p-2'/>
            <span>Call To Us</span>
            </h4>

            <p>We are available 24/7, 7 days a week</p>

            <p>Phone: +8801342353465</p>

            <div className='border-b-2 my-6 border-gray-400/70'></div>

             <h4 className='flex gap-x-3 items-center text-lg font-semibold'>
            <Mail className='rounded-full size-10 bg-red-600 text-white p-2'/>
            <span>Write To Us</span>
            </h4>

            <p>Fill out form and we will contact you within 24 hours.</p>

            <p>Email: customer@exclusive.com</p>
            <p>Email: support@exclusive.com</p>
        </nav>

    <nav className='px-6 py-10 rounded-md shadow grow max-h-194 overflow-y-auto'>
        <form >
            <div className='flex gap-3 mb-6 flex-wrap justify-between'>
                <input 
                type="text"
                 placeholder='Your Name*'
                 className='bg-gray-200/65 grow text-gray-600 outline-none px-2.5 py-2'
                 />
                 <input 
                type="text"
                 placeholder='Your Email*'
                 className='bg-gray-200/65 grow text-gray-600 outline-none px-2.5 py-2'
                 />
                 <input 
                type="text"
                 placeholder='Your Phone*'
                 className='bg-gray-200/65 grow text-gray-600 outline-none px-2.5 py-2'
                 />
            </div>

         
                <textarea className='bg-gray-200/65 w-full min-h-52 text-gray-600 outline-none px-2.5 py-2 align-text-top mb-6' type="text" placeholder='Enter Massage'>
                </textarea>
           <div className='flex justify-end'>
            <Button >Send Message</Button>
           </div>
        </form>
    </nav>


    </section>

 

    </div>
  )
}

export default Contact;
