import { Logo } from "@altha/core/components/ui/logo"
import { AppFooter } from "@altha/core/components/app-footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen">
      <nav className="sticky top-0 left-0 w-full h-auto z-[1] px-6 lg:px-16 py-6">
        <div className="container mx-auto">
          <span
            aria-label="Home"
            className="relative inline-block w-[54px] md:w-24 h-8"
          >
            {/* <Logo /> */}
          </span>
        </div>
      </nav>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="container mx-auto flex-1 flex flex-col items-center justify-center w-full">
          {children}
        </div>
      </div>
      <AppFooter />
    </main>
  );
}
