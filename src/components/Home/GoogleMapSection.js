import React, { useContext, useEffect, useState } from 'react';
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayViewF, useJsApiLoader } from '@react-google-maps/api';
import { SourceContext } from '../../../context/SourceContext';
import { DestinationContext } from '../../../context/DestinationContext';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.3,
  };

  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const [center, setCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });

  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints]=useState([]);

  useEffect(() => {
    if (source && source.lat && source.lng && map) {
      map.panTo({
        lat: source.lat,
        lng: source.lng,
      });
      setCenter({
        lat: source.lat,
        lng: source.lng,
      });
    }
    if(source.length!=[] && destination.length!=[]){
      directionRoute();
    }
  }, [source]);

  useEffect(() => {
    if (destination && destination.lat && destination.lng && map) {
      map.panTo({
        lat: destination.lat,
        lng: destination.lng,
      });
      setCenter({
        lat: destination.lat,
        lng: destination.lng,
      });
    }
    if(source.length!=[] && destination.length!=[]){
      directionRoute();
    }
  }, [destination]);

  // const directionRoute=()=>{
  //   const DirectionService=new google.maps.DirectionService();

  //   DirectionService.route({
  //     origin:{lat:source.lat, lng:source.lng},
  //     destination:{lat:destination.lat, lng:destination.lng},
  //     travelMode:google.maps.TravelMode.DRIVING,

  //   },(result,status)=>{
  //     if(status===google.maps.DirectionsService.OK){
  //       setDirectionRoutePoints(result)
  //     }else{
  //       console.error('Error');
  //     }
  //   })
  // }

  const directionRoute = () => {
    const directionsService = new google.maps.DirectionsService(); // Correct name
  
    directionsService.route({
      origin: { lat: source.lat, lng: source.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log('Route found:', result);
        // You can set the directions here if needed
        setDirectionRoutePoints(result)
      } else {
        console.error('Directions request failed due to ', status);
      }
    });
  };
  

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback((map) => {
    setMap(null);
  }, []);

  return (
    <>
      {/* Google Map */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ mapId: 'c14b6642c8a44efa' }}
      >
        {/* Add markers for source and destination */}
        {source && source.lat && source.lng && (
          <>
            <MarkerF
              position={{ lat: source.lat, lng: source.lng }}
              icon={{
                url: "/carpoolLogo.png",
                scaledSize: {
                  width: 20,
                  height: 20
                }
              }}
            />
            <OverlayViewF
              position={{ lat: source.lat, lng: source.lng }}
              mapPaneName={OverlayViewF.OVERLAY_MOUSE_TARGET}
            >
              <div className='p-2 bg-white font-bold inline-block'>
                <p className='text-black text-{16px}' >{source.label}</p>
              </div>
            </OverlayViewF>
          </>
        )}
        
        {destination && destination.lat && destination.lng && (
          <>
          <MarkerF
            position={{ lat: destination.lat, lng: destination.lng }}
            icon={{
              url: "/carpoolLogo.png",
              scaledSize: {
                width: 20,
                height: 20
              }
            }}
          />
          <OverlayViewF
              position={{ lat: destination.lat, lng: destination.lng }}
              mapPaneName={OverlayViewF.OVERLAY_MOUSE_TARGET}
            >
              <div className='p-2 bg-white font-bold inline-block'>
                <p className='text-black text-{16px}' >{destination.label}</p>
              </div>
            </OverlayViewF>
            </>
        )}
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{
            suppressMarkers:true
          }}
        />
      </GoogleMap>
    </>
  );
}

export default GoogleMapSection;
