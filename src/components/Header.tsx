"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLoggedIn = status === "authenticated" && session?.user;

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-gray-200/50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2" aria-label="ArchetypeConnect home">
            <span className="text-2xl" aria-hidden="true">&#10022;</span>
            <span className="text-xl font-bold gradient-text">
              ArchetypeConnect
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <NavLink href="/quiz" current={pathname}>
              Quiz
            </NavLink>
            <NavLink href="/groups" current={pathname}>
              Groups
            </NavLink>
            <NavLink href="/meetings" current={pathname}>
              Meetings
            </NavLink>
            <NavLink href="/community" current={pathname}>
              Community
            </NavLink>
          </nav>
          <div className="flex items-center gap-3">
            {isLoggedIn && session?.user ? (
              <a
                href={`/profile/${session.user.id}`}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors hidden sm:flex items-center gap-2"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt=""
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                    {(session.user.name ?? "U").charAt(0).toUpperCase()}
                  </span>
                )}
                {session.user.name ?? "My Profile"}
              </a>
            ) : (
              <a
                href="/login"
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors hidden sm:block"
              >
                Sign In
              </a>
            )}
            <a
              href="/quiz"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Take Quiz
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  current,
  children,
}: {
  href: string;
  current: string;
  children: React.ReactNode;
}) {
  const isActive = current === href || current.startsWith(href + "/");
  return (
    <a
      href={href}
      className={`text-sm font-medium transition-colors ${
        isActive
          ? "text-indigo-600"
          : "text-gray-600 hover:text-indigo-600"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
}
