import Image from "next/image";
import { Suspense } from "react";
import { PasswordResetProcessor } from "./_/components/password-reset-processor";

export default function Page() {
  return ( 
    <div className="container mx-auto h-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24 -mt-20">
      {/* Gambar di kiri */}
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <Image
          alt="Career at Altha Consulting"
          className="object-cover pointer-events-none select-none"
          quality={100}
          width={700}   
          height={1000}
          src="/images/rasci-bg-alternate.png"
        />
      </div>

      {/* Login form di kanan */}
      {/* <div className="w-full md:w-auto max-w-[300px] flex flex-col gap-6">
          <PasswordResetProcessor />
      </div> */}
      <div className="w-full md:w-auto max-w-[300px] flex flex-col gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          <PasswordResetProcessor />
        </Suspense>
      </div>
    </div>
  );
}
