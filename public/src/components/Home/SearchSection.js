"use client";
import React, { useContext, useEffect } from 'react'; 
import InputItem from './InputItem';
import { SourceContext } from '../../../context/SourceContext';
import { DestinationContext } from '../../../context/DestinationContext';

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  useEffect(() => {
    if (source) {
      console.log("Source: ", source);
    }
    if (destination) {
      console.log("Destination: ", destination);
    }
  }, [source, destination]);

  return (
    <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
      <p className='text-[20px] font-bold'>Get a Ride</p>
      <InputItem type='source' />
      <InputItem type='destination' />

      <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'>
        Search
      </button>
    </div>
  );
}

export default SearchSection;
