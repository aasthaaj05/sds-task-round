import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.45,
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, // Ensure this key is in your .env file
    libraries: ['places'], // Include 'places' to support places features
  });

  // State to handle the destination input
  const [destination, setDestination] = useState('');
  const autocompleteRef = useRef(null);

  // Initialize Google Places Autocomplete on destination input
  useEffect(() => {
    if (isLoaded && window.google && window.google.maps && !autocompleteRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('destination-input'),
        { types: ['geocode'] } // Set options like 'geocode' to prioritize address suggestions
      );

      // Event listener for when the user selects a place from the autocomplete suggestions
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setDestination(place.formatted_address); // Update state with the selected address
      });

      autocompleteRef.current = autocomplete; // Save the instance to prevent re-initialization
    }
  }, [isLoaded]);

  // State management for the map
  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      {/* Input field for destination */}
      <input
        type="text"
        id="destination-input"
        value={destination}
        onChange={(e) => setDestination(e.target.value)} // Allow manual input
        placeholder="Enter destination"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      />

      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ mapId: 'ae64bd20735c37c5' }}
      >
        {/* Add any markers, etc. here */}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default GoogleMapSection;
