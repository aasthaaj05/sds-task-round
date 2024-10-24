"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import SearchSection from "@/components/Home/SearchSection";
import PostRideModal from "@/components/Home/PostRideModal";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import PreviousTrips from "@/components/Home/PreviousTrips"; // Import PreviousTrips component
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";

export default function Home() {
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [isPostRideModalOpen, setIsPostRideModalOpen] = useState(false);
  const [showPreviousTrips, setShowPreviousTrips] = useState(false); // Toggle for previous trips

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
          libraries={["places"]}
          googleMapsApiKey="AIzaSyAz-92LEq9W0wbfhIdUKtj_lC7AMx0Ysio"
        >
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Toggle Button for Search, Post Ride, and Previous Trips */}
            <div className="col-span-3 mb-5 flex justify-between">
              <button
                className="p-3 bg-black text-white rounded-lg"
                onClick={() => setIsPostRideModalOpen(true)} // Open the Post Ride modal
              >
                Post Ride
              </button>

              <button
                className="p-3 bg-black text-white rounded-lg"
                onClick={() => setShowPreviousTrips(!showPreviousTrips)} // Toggle Previous Trips
              >
                {showPreviousTrips ? "Hide Previous Trips" : "View Your Previous Trips"}
              </button>
            </div>

            {/* Conditionally render Previous Trips or Search Section */}
            {showPreviousTrips ? (
              <div className="col-span-3">
                <PreviousTrips />
              </div>
            ) : (
              <>
                {/* Search Section */}
                <div className="col-span-1">
                  <SearchSection />
                </div>

                {/* Google Map Section */}
                <div className="col-span-2">
                  <GoogleMapSection />
                </div>
              </>
            )}

            {/* Post Ride Modal */}
            {isPostRideModalOpen && (
              <PostRideModal onClose={() => setIsPostRideModalOpen(false)} />
            )}
          </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
