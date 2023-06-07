import React from 'react'
import Image from 'next/image'


const ProductDetail = () => {

  return (
    <>
      <div className='flex flex-col ' >
   
          <Image
              width={400}
              height={186}
              src={'/car.png'}
              alt={'car image'}
          />

        <div className='flex flex-col gap-1 bg-grey-10'>
          <h3 className='heading-6-600'>Mercedes Benz A 200 CGI ADVANCE SEDAN Mercedes Benz A 200 </h3>
          <div className='flex justify-between'>
            <div className='flex gap-1' >
              <p className='btn-brand-opacity px-2 py-1 rounded'> 2013 </p>
              <p className='btn-brand-opacity px-2 py-1 rounded'> 0 KM </p>
            </div>
            <p>R$ 00.000,00</p>
          </div>

          <button className='btn-brand1 w-max px-5 py-3 rounded'>Comprar</button>
        </div>

      </div>

    </>
  )
}

export default ProductDetail