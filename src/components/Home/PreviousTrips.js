// PreviousTrips.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {db,app, analytics} from '../../firebase/firebaseConfig' // Adjust the path based on your project structure

const PreviousTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      const tripsCollection = collection(db, 'trips');
      const tripSnapshot = await getDocs(tripsCollection);
      const tripList = tripSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrips(tripList);
    };

    fetchTrips();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Previous Trips</h2>
      <div className="space-y-4">
        {trips.map((trip) => (

          <div key={trip.id} className="border p-4 rounded-lg shadow-sm">
            <p><strong>Pick Up Location:</strong> {trip.pickUpLocation}</p>
            <p><strong>Drop Off Location:</strong> {trip.dropOffLocation}</p>
            <p><strong>Date:</strong> </p>
            <p><strong>Time:</strong> </p>
            <p><strong>Cost:</strong> ${trip.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default PreviousTrips;
