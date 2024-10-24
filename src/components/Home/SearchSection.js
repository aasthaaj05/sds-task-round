"use client";
import React, { useContext, useEffect, useState } from 'react'; 
import InputItem from './InputItem';
import { SourceContext } from '../../../context/SourceContext';
import { DestinationContext } from '../../../context/DestinationContext';

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [distance, setDistance] = useState(null);

  // Function to calculate the distance between source and destination
  const calculateDistance = () => {
    if (source && destination && source.lat && source.lng && destination.lat && destination.lng) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(source.lat, source.lng),
        new google.maps.LatLng(destination.lat, destination.lng)
      );
      setDistance(dist);
    }
  };

  useEffect(() => {
    if (source) {
      console.log("Source: ", source);
    }
    if (destination) {
      console.log("Destination: ", destination);
    }
  }, [source, destination]);

  return (
    <div>
    <div className='p-2 md:pd-5 border-[2px] rounded-xl'>
      <p className='text-[20px] font-bold'>Get a Ride</p>
      <InputItem type='source' />
      <InputItem type='destination' />

      <button 
        className='p-3 bg-black w-full mt-5 text-white rounded-lg'
        onClick={()=>calculateDistance()}
      >
        Search
      </button>
      {distance?<carListOptions distance={distance}/>:null}
      </div>
    </div>
  );
}

export default SearchSection;
