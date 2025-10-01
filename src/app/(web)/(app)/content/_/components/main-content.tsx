"use client";

import Image from "next/image";
import { useGetAuthenticationStatus } from "@altha/app/(auth)/_/hooks/use-get-authentication-status";
import { LoginForm } from "@altha/app/(auth)/login/_/components/login-form";
import { Empty } from "@altha/core/components/ui/empty";
import { EmptyState } from "@altha/core/components/ui/empty-state";

export default function MainContent() {
  const authenticationStatus = useGetAuthenticationStatus();
  const isLoggedIn = authenticationStatus.data?.success;

  return isLoggedIn ? (
    <>
      <EmptyState />
    </>
  ) : (   
    <div className="container mx-auto h-full flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24">
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
      <div className="w-full md:w-auto max-w-[300px] flex flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
