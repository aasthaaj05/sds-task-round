import React, { useState } from 'react';
import { CarListData } from '../../../utils/CarListData';
import CarListItem from './CarListItem';

function CarListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
      <div>
        <h2 className='text-[22px] font-bold'>Recommended</h2>
        {CarListData.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer p-2 rounded-md border-black px-4 ${
              activeIndex === index ? 'border-[3px]' : ''
            }`}
            onClick={() => {setActiveIndex(index);
              setSelectedCar(item)
            }} // Update active index on click
          >
            <CarListItem car={item} distance={distance}/>
          </div>
        ))}
        {selectedCar?.name?
        <div className='flex justify-between fixed  bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg'>
          <h2>Make Payment For</h2>
          <button className='p-3 bg-black text-white rounded-lg text-center'>Request {selectedCar.name}</button>
        </div>:null}
      </div>
    </div>
  );
}

export default CarListOptions;
