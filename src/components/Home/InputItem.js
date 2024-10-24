"use client";
import React, { useEffect, useState, Suspense, lazy, useContext } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import { SourceContext } from '../../../context/SourceContext';
import { DestinationContext } from '../../../context/DestinationContext';

const GooglePlacesAutocomplete = lazy(() => import('react-google-places-autocomplete'));

function InputItem({ type }) {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  useEffect(() => {
    console.log("Component mounted, type:", type);
    setPlaceholder(type === 'source' ? 'PickUp Location' : 'DropOff Location');
  }, [type]);

  const handleScriptLoad = async () => {
    try {
      console.log("Script loaded..");
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log("Google Maps API is ready!");
        setIsScriptLoaded(true);
      } else {
        console.error("Google Maps API script not fully loaded");
      }
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  const handleScriptError = (e) => {
    console.error("Failed to load Google Maps script: ", e);
    alert("Failed to load Google Maps. Please try again later.");
  };

  const getLatAndLng = (place) => {
    if (place && place.value) {
      const placeId = place.value.place_id;
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails({ placeId }, (placeDetails, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const { geometry, formatted_address, name } = placeDetails;
          const lat = geometry.location.lat();
          const lng = geometry.location.lng();

          // Handle source or destination based on type
          if (type === 'source') {
            setSource({
              lat,
              lng,
              name: formatted_address,
              label: name,
            });
            console.log("Source set: ", { lat, lng, name });
          } else {
            setDestination({
              lat,
              lng,
              name: formatted_address,
              label: name,
            });
            console.log("Destination set: ", { lat, lng, name });
          }
        } else {
          console.error("Failed to get place details:", status);
        }
      });
    } else {
      console.error('Place is undefined');
    }
  };

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAz-92LEq9W0wbfhIdUKtj_lC7AMx0Ysio&loading=async&libraries=places`}
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="lazyOnload"
      />

      {/* Autocomplete Input */}
      <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
        <Image src="/carpoolLogo.png" width={15} height={15} alt="Logo" />

        {isScriptLoaded ? (
          <Suspense fallback={<p>Loading autocomplete...</p>}>
            <GooglePlacesAutocomplete
              // apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
              selectProps={{
                value,
                onChange: (place) => {
                  console.log("Autocomplete value changed:", place);
                  setValue(place);
                  getLatAndLng(place); // Call the function to get lat/lng
                },
                placeholder: placeholder,
                isClearable: true,
                className: 'w-full',
                components: {
                  DropdownIndicator: () => null,
                },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: '#00ffff00',
                  }),
                },
              }}
            />
          </Suspense>
        ) : (
          <p>Loading Google Maps...</p> // Fallback
        )}
      </div>
    </>
  );
}

export default InputItem;
