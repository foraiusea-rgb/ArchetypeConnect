"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLoggedIn = status === "authenticated" && session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/quiz", label: "Quiz" },
    { href: "/groups", label: "Groups" },
    { href: "/meetings", label: "Meetings" },
    { href: "/community", label: "Community" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 glass-card border-b transition-all duration-300 ${
        scrolled
          ? "border-black/[0.08] shadow-sm dark:border-slate-700/80"
          : "border-black/[0.04] dark:border-slate-700/50"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          <a href="/" className="flex items-center gap-1" aria-label="ArchetypeConnect home">
            <span className="font-display text-xl text-[#1A1A2E] dark:text-gray-100">
              Archetype<span className="text-[#D4654A]">Connect</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} current={pathname}>{link.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-[#1A1A2E] hover:bg-black/[0.04] dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden sm:flex items-center gap-3">
              {isLoggedIn && session?.user ? (
                <a href={`/profile/${session.user.id}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors flex items-center gap-2">
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-[#FEF0EC] dark:bg-[#D4654A]/20 text-[#D4654A] flex items-center justify-center text-xs font-bold">
                      {(session.user.name ?? "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                  {session.user.name ?? "My Profile"}
                </a>
              ) : (
                <a href="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#D4654A] dark:hover:text-[#E8806A] transition-colors">
                  Sign In
                </a>
              )}
              <a href="/quiz" className="bg-[#D4654A] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-[#C05A42] transition-all shadow-sm hover:shadow-md">
                Take Quiz
              </a>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-black/[0.06] dark:border-slate-700/50 bg-[#FAF8F5]/95 dark:bg-slate-900/95 backdrop-blur-xl" aria-label="Mobile navigation">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <a key={link.href} href={link.href} className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive ? "bg-[#FEF0EC] dark:bg-[#D4654A]/20 text-[#D4654A]" : "text-gray-700 dark:text-gray-300 hover:bg-black/[0.03] dark:hover:bg-slate-800"}`} aria-current={isActive ? "page" : undefined}>
                  {link.label}
                </a>
              );
            })}
            <div className="border-t border-black/[0.06] dark:border-slate-700 pt-3 mt-3 space-y-2">
              {isLoggedIn && session?.user ? (
                <a href={`/profile/${session.user.id}`} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-black/[0.03] dark:hover:bg-slate-800 transition-colors">My Profile</a>
              ) : (
                <a href="/login" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-black/[0.03] dark:hover:bg-slate-800 transition-colors">Sign In</a>
              )}
              <a href="/quiz" className="block text-center px-4 py-3 rounded-xl bg-[#D4654A] text-white font-semibold hover:bg-[#C05A42] transition-colors">Take the Quiz</a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function NavLink({ href, current, children }: { href: string; current: string; children: React.ReactNode }) {
  const isActive = current === href || current.startsWith(href + "/");
  return (
    <a href={href} className={`text-sm font-medium transition-colors ${isActive ? "text-[#D4654A] dark:text-[#E8806A]" : "text-gray-500 dark:text-gray-300 hover:text-[#1A1A2E] dark:hover:text-[#E8806A]"}`} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
}
