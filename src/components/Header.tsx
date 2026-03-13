"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
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
          ? "border-gray-200/80 shadow-md dark:border-slate-700/80"
          : "border-gray-200/50 dark:border-slate-700/50"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2" aria-label="ArchetypeConnect home">
            <Sparkles size={22} className="text-indigo-500" aria-hidden="true" />
            <span className="text-xl font-bold gradient-text">ArchetypeConnect</span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} current={pathname}>{link.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden sm:flex items-center gap-3">
              {isLoggedIn && session?.user ? (
                <a href={`/profile/${session.user.id}`} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2">
                  {session.user.image ? (
                    <img src={session.user.image} alt="" className="w-6 h-6 rounded-full" />
                  ) : (
                    <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                      {(session.user.name ?? "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                  {session.user.name ?? "My Profile"}
                </a>
              ) : (
                <a href="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Sign In
                </a>
              )}
              <a href="/quiz" className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
                Take Quiz
              </a>
            </div>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-200/50 dark:border-slate-700/50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg" aria-label="Mobile navigation">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <a key={link.href} href={link.href} className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"}`} aria-current={isActive ? "page" : undefined}>
                  {link.label}
                </a>
              );
            })}
            <div className="border-t border-gray-100 dark:border-slate-700 pt-3 mt-3 space-y-2">
              {isLoggedIn && session?.user ? (
                <a href={`/profile/${session.user.id}`} className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">My Profile</a>
              ) : (
                <a href="/login" className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">Sign In</a>
              )}
              <a href="/quiz" className="block text-center px-4 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">Take the Quiz</a>
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
    <a href={href} className={`text-sm font-medium transition-colors ${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"}`} aria-current={isActive ? "page" : undefined}>
      {children}
    </a>
  );
}
