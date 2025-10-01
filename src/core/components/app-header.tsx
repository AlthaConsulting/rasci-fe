"use client";

import Image from "next/image";
import Link from "next/link";
import BackgroundImage from "../../../public/images/hero-bg.jpg";
import { useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGetAuthenticationStatus } from "@altha/app/(auth)/_/hooks/use-get-authentication-status";
import { useLogout } from "@altha/app/(auth)/_/hooks/use-logout";
import { cn } from "../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Logo } from "./ui/logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Bell,
  Briefcase,
  ClipboardText,
  Gear,
  List,
  SignOut,
  User,
} from "@phosphor-icons/react";

export const AppHeader = () => {
  const authenticationStatus = useGetAuthenticationStatus();
  return authenticationStatus.data?.success ? (
    <PrivateHeader />
  ) : (
    <PublicHeader />
  );
};

const HeaderLogo = () => {
  return (
    <Link
      aria-label="Home"
      className="relative inline-block w-[54px] md:w-24 h-8"
      href="/"
    >
      <Logo />
    </Link>
  );
};

const PublicLinks = () => {
  return (
    <nav className="relative z-10 w-full h-auto px-4 md:px-8 lg:px-16 py-3 md:py-4 lg:py-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* <HeaderLogo /> */}
      </div>
    </nav>
  );
};

function PublicHeader() {
  return (
    <header className="relative w-full h-auto">
      <PublicLinks />
      {/* <HeroBackground /> */}
    </header>
  );
}

const useUrls = () => {
  const urls = useMemo(
    () => [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Online Test",
        href: "/tests",
      },
      {
        label: "Assignment",
        href: "/assignment",
      },
    ],
    []
  );

  const pathname = usePathname();
  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  return {
    urls,
    isActive,
  };
};

const MobileLinks = () => {
  const { isActive, urls } = useUrls();
  return (
    <Sheet>
      <SheetTrigger aria-label="Open Menu" className="lg:hidden">
        <List className="size-6 md:size-8" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-left">My Account</SheetTitle>
          <SheetDescription className="sr-only">
            Explore Menu in Your Account
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-1 -mx-4 my-4">
          {urls.map((url) => (
            <Link
              key={url.href}
              className={cn(
                "flex items-center gap-2 text-sm p-4 rounded",
                isActive(url.href) ? "bg-accent" : "hover:bg-accent/50"
              )}
              href={url.href}
            >
              {url.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const PrivateLinks = () => {
  const { isActive, urls } = useUrls();
  return (
    <ul className="hidden lg:flex items-center gap-8">
      {urls.map((url) => (
        <li key={url.href}>
          <Link
            className={cn(
              "w-auto h-auto px-3 py-1.5 rounded transition-colors",
              isActive(url.href)
                ? "bg-accent-foreground"
                : "hover:bg-accent-foreground/20"
            )}
            href={url.href}
          >
            {url.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const UserDropdownMenu = () => {
  const authenticationStatus = useGetAuthenticationStatus();

  const router = useRouter();
  const logout = useLogout();

  const userName = useMemo(() => {
    if (!authenticationStatus.data?.success) return "";
    return authenticationStatus.data?.result.data.user.display;
  }, [authenticationStatus]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button aria-label="Open Dropdown Menu">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="text-white">
              {userName
                .split(" ")
                .map((char) => char[0].toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push("/account/profile")}>
            <User />
            My Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push("/account/settings")}>
            <Gear />
            My Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => router.push("/account/my-application")}>
            <Briefcase />
            My Applications
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ClipboardText />
              My Tasks
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => router.push("/tests")}>Online Tests</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => router.push("/assignment")}>Assignments</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => logout.mutate()}>
          <SignOut />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

function PrivateHeader() {
  const pathname = usePathname();
  return (
    <header className="w-full h-auto">
      <nav className="bg-sidebar px-4 py-4 md:px-8 md:py-6 lg:px-16 lg:py-6 text-background">
        <div className="flex items-center justify-between container mx-auto">
          <div className="flex items-center gap-24">
            <div className="flex items-center gap-4 md:gap-5">
              <MobileLinks />
              <HeaderLogo />
            </div>
            <PrivateLinks />
          </div>
          <div className="flex items-center gap-4 md:gap-5 lg:gap-8">
            <Bell className="size-6" />
            <UserDropdownMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
