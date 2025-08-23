"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconHome } from "@tabler/icons-react";
import { IconBrandDatabricks } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import UserButton from "../UserButton";
import { IconCircleDottedLetterN } from "@tabler/icons-react";

export const GlassNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const session = useSession();

  const user = session.data?.user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed px-20 top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "backdrop-blur-md bg-black/20 border-b border-white/10"
          : "backdrop-blur-sm bg-black/10"
      }`}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-white"
          >
            <IconCircleDottedLetterN stroke={2} />
            Neo
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <IconHome stroke={1.5} />
              Home
            </Link>
            <Link
              href="/services"
              className="text-white/90 hover:text-white transition-colors duration-200 flex items-center gap-2"
            >
              <IconBrandDatabricks stroke={1.5} /> Services
            </Link>
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            {/* <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div> */}
            <UserButton user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};
