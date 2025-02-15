"use client";
import { useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import SearchSection from "@/components/Home/SearchSection";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import { SourceContext } from "../../context/SourceContext"; // Ensure correct path
import { DestinationContext } from "../../context/DestinationContext"; // You need to create this context

export default function Home() {
  const [source, setSource] = useState([]); // State for source location
  const [destination, setDestination] = useState([]); // State for destination location

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <SearchSection />
          </div>
          <div className="col-span-2">
            <GoogleMapSection />
          </div>
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
