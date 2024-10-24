"use client";
import React from "react";
import dummyTrips from "../../../data/dummyTripsData"; // Import the dummy data

export default function PreviousTrips() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Previous Trips</h2>
      <div className="space-y-4">
        {dummyTrips.map((trip) => (
          <div key={trip.id} className="border p-4 rounded-lg shadow-sm">
            <p><strong>PickUp Location:</strong> {trip.pickUpLocation}</p>
            <p><strong>DropOff Location:</strong> {trip.dropOffLocation}</p>
            <p><strong>Date:</strong> {trip.date}</p>
            <p><strong>Time:</strong> {trip.time}</p>
            <p><strong>Cost:</strong> {trip.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
