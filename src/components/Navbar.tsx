"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/feronlabs", label: "FeronLabs" },
  { href: "/brand", label: "Brand" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-black/5">
      <nav className="flex items-center justify-between px-6 py-4 max-w-[1800px] mx-auto">
        {/* Left: Navigation Links */}
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link text-[12px] font-normal uppercase tracking-wider text-black transition-opacity hover:opacity-70 ${
                pathname === link.href ? "active" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Center: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="/brand/logo-horizontal.svg"
            alt="Feron"
            width={120}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <button
            aria-label="Search"
            className="text-black hover:opacity-70 transition-opacity"
          >
            <Search size={16} strokeWidth={1.5} />
          </button>
          <Link
            href="/account"
            className="nav-link text-[12px] font-normal uppercase tracking-wider text-black hover:opacity-70 transition-opacity"
          >
            Account
          </Link>
          <Link
            href="/cart"
            className="nav-link text-[12px] font-normal uppercase tracking-wider text-black hover:opacity-70 transition-opacity"
          >
            Cart (0)
          </Link>
        </div>
      </nav>
    </header>
  );
}
