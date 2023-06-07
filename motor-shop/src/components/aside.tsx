import React from 'react'
import Image from 'next/image'

const Aside = () => {
  return (
    <div className='flex flex-col gap-5'>
        <div className='bg-grey-10 flex flex-col rounded p-5 gap-5' >
            <h4 className='heading-6-600'>Fotos</h4>
                <div className='felx grid grid-cols-3 gap-2 '>
                    <Image
                        width={400}
                        height={186}
                        src={'/car.png'}
                        alt={'car image'}
                        className=' bg-grey-8 rounded'
                        />
                            <Image
                        width={400}
                        height={186}
                        src={'/car.png'}
                        alt={'car image'}
                        className=' bg-grey-8 rounded'
                        />
                            <Image
                        width={400}
                        height={186}
                        src={'/car.png'}
                        alt={'car image'}
                        className=' bg-grey-8 rounded'
                        />
                            <Image
                        width={400}
                        height={186}
                        src={'/car.png'}
                        alt={'car image'}
                        className=' bg-grey-8 rounded'
                        />
                            <Image
                        width={400}
                        height={186}
                        src={'/car.png'}
                        alt={'car image'}
                        className=' bg-grey-8 rounded'
                        />
                            <Image
                        width={400}
                        height={186}
                        src={'/car.png'}
                        alt={'car image'}
                        className=' bg-grey-8 rounded'
                        />
                </div>

        </div>
        <div className='bg-grey-10 rounded' >
            <div className='flex flex-col gap-5 items-center p-10'>
                <div className='bg-brand-1 w-32 h-32 rounded-full'></div>
                <div className='heading-6-600'>Announcer name</div>
                <p className='text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                <button className='btn-grey1 btn-medium'>All announcer's products</button>
            </div>
        </div>
    </div>
  )
}


export default Aside