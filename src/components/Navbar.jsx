"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useUser,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { FaHome, FaBars, FaTimes, FaRegCalendarPlus } from "react-icons/fa";
import {
  MdEventAvailable,
  MdCelebration,
  MdEventNote,
  MdOutlineEventNote,
  MdEvent,
} from "react-icons/md";
import Swal from "sweetalert2";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && user) {
      const alreadyShown = localStorage.getItem(`loginAlertShown_${user.id}`);
      if (!alreadyShown) {
        const saveUser = async () => {
          const userData = {
            userId: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress?.emailAddress,
            image: user.imageUrl,
          };

          try {
            await fetch("https://event-managment-serrver.vercel.app/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            });
            Swal.fire({
              title: "Welcome!",
              text: `Hello ${user.fullName}, you have logged in successfully!`,
              icon: "success",
              confirmButtonColor: "#0ea5e9",
            });
            localStorage.setItem(`loginAlertShown_${user.id}`, "true");
          } catch (err) {
            console.error("Error saving user:", err);
          }
        };
        saveUser();
      }
    }
  }, [user, isLoaded]);

  const publicLinks = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/all-events", label: "All Events", icon: <MdEventAvailable /> },
  ];

  const privateLinks = [
    { href: "/my-events", label: "My Events", icon: <MdEventNote /> },
    {
      href: "/create-event",
      label: "Create Event",
      icon: <FaRegCalendarPlus />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-sky-400/30">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-linear-to-r from-sky-600 to-cyan-500 rounded-lg text-white">
            <MdCelebration className="text-xl" />
          </div>
          <span className="font-extrabold text-xl text-gray-800 group-hover:text-sky-600 transition">
            Event<span className="text-sky-600">Flow</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3">
          {publicLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  active
                    ? "bg-linear-to-r from-sky-600 to-cyan-500 text-white shadow"
                    : "text-gray-700 hover:bg-cyan-100/40 hover:text-sky-600"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          <SignedIn>
            {privateLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                    active
                      ? "bg-linear-to-r from-sky-600 to-cyan-500 text-white shadow"
                      : "text-gray-700 hover:bg-cyan-100/40 hover:text-sky-600"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </SignedIn>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2 rounded-md font-medium text-white bg-linear-to-r from-sky-600 to-cyan-500 hover:opacity-90 cursor-pointer">
                Login
              </button>
            </SignInButton>

            <SignUpButton mode="modal">
              <button className="px-5 py-2 rounded-md font-medium border border-sky-500 text-sky-600 hover:bg-cyan-100/40 cursor-pointer">
                Register
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="p-[3px] rounded-full bg-linear-to-r from-sky-600 to-cyan-500 shadow-md shadow-sky-400/40">
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Create Event"
                    labelIcon={<MdEvent />}
                    href="/create-event"
                  />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Manage Events"
                    labelIcon={<MdOutlineEventNote />}
                    href="/my-events"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          </SignedIn>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-sky-700 text-2xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="flex flex-col gap-1 px-4 py-4 border-t border-sky-400/30">
            {publicLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                    active
                      ? "bg-linear-to-r from-sky-600 to-cyan-500 text-white shadow"
                      : "text-gray-700 hover:bg-cyan-100/40 hover:text-sky-600"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}

            <SignedIn>
              {privateLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                      active
                        ? "bg-linear-to-r from-sky-600 to-cyan-500 text-white shadow"
                        : "text-gray-700 hover:bg-cyan-100/40 hover:text-sky-600"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                );
              })}
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-2 rounded-md text-white bg-linear-to-r from-sky-600 to-cyan-500 hover:opacity-90 cursor-pointer"
                >
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center px-4 py-2 rounded-md border border-sky-500 text-sky-600 hover:bg-cyan-100/40 cursor-pointer"
                >
                  Register
                </button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              <div className="flex justify-center py-2">
                <div className="p-[3px] rounded-full bg-linear-to-r from-sky-600 to-cyan-500 shadow-md shadow-sky-400/40">
                  <UserButton>
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Create Event"
                        labelIcon={<MdEvent />}
                        href="/create-event"
                      />
                    </UserButton.MenuItems>
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Manage Events"
                        labelIcon={<MdOutlineEventNote />}
                        href="/my-events"
                      />
                    </UserButton.MenuItems>
                  </UserButton>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      )}
    </header>
  );
}
