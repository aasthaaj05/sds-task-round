import React from 'react'
import Image from 'next/image'

function CarListItem({car, distance}) {
  return (
    <div>
      <div className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-5'>
        <Image src={car.image}
        width={100} height={100}/>
        <div>
            <h2 className='font-semibold text-[18px] flex gap-3'>
                {car.name}
                {car.seat}
                </h2>
        </div>
        </div> 
        <h2 className='text-[18px] font-semibold'>${((car.amount*distance)/car.seat).toFixed(2)}</h2>
      </div>
    </div>
  )
}

export default CarListItem
