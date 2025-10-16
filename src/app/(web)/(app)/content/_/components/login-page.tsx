"use client";

import Image from "next/image";
import { LoginForm } from "@altha/app/(auth)/login/_/components/login-form";

export default function LoginPage() {
    return (
        <div className="flex-1 flex items-center justify-center p-4 py-5 md:p-8 md:pt-6 lg:p-24 lg:pt-8">
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
        </div>
    )
}
