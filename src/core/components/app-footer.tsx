import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Separator } from "./ui/separator";
import { Logo } from "./ui/logo";

export const AppFooter = () => {
  return (
    <footer className="w-full h-auto px-4 py-5 md:px-8 md:py-6 lg:px-16 lg:py-8 bg-blue-950 text-gray-200">
      <div className="flex flex-col gap-3 container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Link aria-label="Home" className="relative w-24 h-8" href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <p>Follow Us</p>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/althaconsulting"
                rel="noreferrer"
                target="_blank"
              >
                <InstagramLogo className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/altha-consulting/"
                rel="noreferrer"
                target="_blank"
              >
                <LinkedinLogo className="size-5" />
              </a>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <small className="text-sm order-2 md:order-1">
            &copy; {new Date().getFullYear()} Altha Dyanusa Consulting. All
            rights reserved.
          </small>
          <a
            className="order-1 md:order-2"
            href="https://www.altha.co.id/en-ID/privacy-policy"
            rel="noreferrer"
            target="_blank"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};
