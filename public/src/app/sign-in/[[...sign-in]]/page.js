import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="relative">
      <Image
        src="/banner.avif"
        width={1000}
        height={900}
        className="object-contain h-full w-full"
        alt="Banner"
      />
      <div className="absolute top-10 right-0 p-4 bg-white rounded shadow-lg"> {/* Added styling for visibility */}
        <SignIn />
      </div>
    </div>
  );
}
