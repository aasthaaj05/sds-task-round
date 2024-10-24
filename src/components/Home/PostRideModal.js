"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation"; // For client-side routing
import { SourceContext } from "../../../context/SourceContext";
import { DestinationContext } from "../../../context/DestinationContext";
import InputItem from "./InputItem"; 

function PostRideModal({ onClose }) {
  const router = useRouter();
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [vehicleType, setVehicleType] = useState("Car");
  const [rideTime, setRideTime] = useState("");

  const handlePostRide = () => {
    const rideDetails = {
      vehicleType,
      source,
      destination,
      rideTime,
    };

    // Navigate to the riders list page with ride details
    router.push({
      pathname: '/riders-list', // Path to your RidersList page
      query: rideDetails, // Pass the ride details as query parameters
    });

    onClose(); // Close modal after submission (if needed)
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Post a Ride</h2>
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Vehicle Type:</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="p-2 border mt-2 w-full rounded-md"
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Start Point:</label>
          <InputItem type="source" />
        </div>

        <div className="mb-4">
          <label className="font-semibold">End Point:</label>
          <InputItem type="destination" />
        </div>

        <div className="mb-4">
          <label className="font-semibold">Time of Ride:</label>
          <input
            type="datetime-local"
            className="p-2 border mt-2 w-full rounded-md"
            value={rideTime}
            onChange={(e) => setRideTime(e.target.value)}
          />
        </div>

        <button
          className="p-3 bg-black text-white w-full mt-5 rounded-lg"
          onClick={handlePostRide}
        >
          Post Ride
        </button>
      </div>
    </div>
  );
}

export default PostRideModal;
