"use client";
import React, { useState } from "react";
import { Menu, X, House, Store, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import UserButton from "./UserButton";
import { signIn, useSession } from "next-auth/react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();
  const user = session.data?.user;

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="w-screen text-black dark:text-white z-40 fixed top-0 bg-white dark:bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 dark:bg-opacity-20 border-none">
      <nav className="container flex justify-between items-center mx-auto px-6 h-16 ">
        <div className="flex items-center mb-1 py-2 space-x-2">
          {/* <Image src="/logo.png" alt="Logo" width={95} height={95} /> */}
          <p className="font-saman mt-1 text-3xl font-extrabold">
            <Link href="/">Neo</Link>
          </p>
        </div>

        {isOpen ? (
          <div className="bg-slate-200 dark:bg-gray-800 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 dark:bg-opacity-90 absolute top-[64px] left-0 w-full flex flex-col gap-6 items-center py-3 text-lg font-semibold">
            <div className="flex flex-col items-center gap-6">
              <Link href="/">
                <div className="flex items-center">
                  <House size={20} />
                  <div className="mt-1 ml-1 ">Home</div>
                </div>
              </Link>
              <Link href="/services">
                <div className="flex items-center">
                  <Store size={20} />
                  <div className="mt-1 ml-1">Services</div>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex">
                <Link href="/sign-in">
                  {user ? (
                    <>
                      <UserButton user={user} />
                    </>
                  ) : (
                    <Button className="flex font-medium text-base rounded-full mt-2  px-5 py-2.5 mb-2">
                      <div className=" mt-0">Login</div>
                    </Button>
                  )}
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="lg:hidden">
          <button onClick={toggleNavbar} aria-label="Toggle Menu">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          <Link href="/">
            <div className="flex items-center">
              <House size={20} />
              <div className="mt-1 ml-1">Home</div>
            </div>
          </Link>
          <Link href="/services">
            <div className="flex items-center">
              <Store size={20} />
              <div className="mt-1 ml-1">Services</div>
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-2">
          <div>
            <Link href="/sign-in">
              {/* <User size={20} /> */}
              {user ? (
                <>
                  <Image
                    src={user.image}
                    alt="user"
                    width={8}
                    height={8}
                    className="w-10 h-10 rounded-full"
                  />
                </>
              ) : (
                <Button className="flex font-medium text-base rounded-full mt-2  px-5 py-2.5 mb-2">
                  <div className=" mt-0">Login</div>
                </Button>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
