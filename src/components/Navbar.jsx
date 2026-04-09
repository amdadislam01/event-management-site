"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import { FaHome, FaBars, FaTimes, FaRegCalendarPlus, FaSignOutAlt, FaUser, FaChevronDown } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";
import {
  MdEventAvailable,
  MdCelebration,
  MdEventNote,
} from "react-icons/md";
import Swal from "sweetalert2";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const { data: session, status } = useSession();
  const user = session?.user;
  const isLoaded = status !== "loading";

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isLoaded && user) {
      const alreadyShown = localStorage.getItem(`loginAlertShown_${user.id || user.email}`);
      if (!alreadyShown) {
        const saveUser = async () => {
          const userData = {
            userId: user.id || user.email,
            name: user.name,
            email: user.email,
            image: user.image,
          };

          try {
            await fetch("/api/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(userData),
            });
            Swal.fire({
              title: "Welcome!",
              text: `Hello ${user.name}, you have logged in successfully!`,
              icon: "success",
              confirmButtonColor: "#0ea5e9",
            });
            localStorage.setItem(`loginAlertShown_${user.id || user.email}`, "true");
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
    { href: "/ticket-booking", label: "My Ticket", icon: <GiTicket /> },
    {
      href: "/create-event",
      label: "Create Event",
      icon: <FaRegCalendarPlus />,
    },
  ];

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-sky-400/30">
      <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-linear-to-r from-sky-600 to-cyan-500 rounded-lg text-white group-hover:scale-105 transition-transform">
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
        </div>

        {/* Desktop User Section */}
        <div className="hidden lg:flex items-center gap-4">
          {status === "unauthenticated" ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-5 py-2 rounded-md font-bold text-gray-700 hover:text-sky-600 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-6 py-2 rounded-xl font-bold text-white bg-linear-to-r from-sky-600 to-cyan-500 hover:shadow-lg hover:shadow-sky-200 transition-all active:scale-95 shadow-md"
              >
                Create Account
              </Link>
            </div>
          ) : status === "loading" ? (
            <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse border border-slate-200"></div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-slate-50 border border-slate-200 hover:border-sky-300 hover:bg-white transition-all shadow-sm cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-sky-500/20">
                  <img 
                    src={user?.image || "https://www.gravatar.com/avatar/?d=mp"} 
                    alt={user?.name || "User"} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-sky-600">{user?.name?.split(' ')[0]}</span>
                <FaChevronDown className={`text-[10px] text-slate-400 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden py-2 z-[60] animate-in fade-in slide-in-from-top-4 duration-200">
                  <div className="px-5 py-3 border-b border-slate-50 mb-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-extrabold text-slate-900 truncate">{user?.email}</p>
                  </div>
                  
                  <Link
                    href="/profile"
                    onClick={() => setIsUserDropdownOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 text-sm font-bold transition-colors ${
                      pathname === "/profile" 
                        ? "text-sky-600 bg-sky-50/50" 
                        : "text-slate-600 hover:text-sky-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      pathname === "/profile" ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-500"
                    }`}>
                      <FaUser />
                    </div>
                    My Profile
                  </Link>

                  <div className="px-2 pt-1 mt-1 border-t border-slate-50">
                    <button 
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                        <FaSignOutAlt />
                      </div>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-sky-600 text-xl"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 shadow-2xl animate-in slide-in-from-top-10 duration-300">
          <div className="flex flex-col gap-2 px-5 py-6">
            {publicLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3 rounded-xl font-bold transition-all ${
                    active
                      ? "bg-linear-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-sky-100"
                      : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              );
            })}

            <div className="space-y-1">
              {privateLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl font-bold transition-all ${
                      active
                        ? "bg-linear-to-r from-sky-600 to-cyan-500 text-white shadow-lg shadow-sky-100"
                        : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                    }`}
                  >
                    <span className="text-xl">{link.icon}</span>
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              {status === "unauthenticated" ? (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center h-12 rounded-xl font-bold text-slate-700 bg-slate-50"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center h-12 rounded-xl font-bold text-white bg-linear-to-r from-sky-600 to-cyan-500 shadow-lg shadow-sky-100"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl mb-2">
                    <img 
                      src={user?.image || "https://www.gravatar.com/avatar/?d=mp"} 
                      alt={user?.name || "User"} 
                      className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                    />
                    <div>
                      <p className="font-extrabold text-slate-900">{user?.name}</p>
                      <p className="text-sm font-bold text-slate-400 truncate max-w-[180px]">{user?.email}</p>
                    </div>
                  </div>
                  
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-5 py-4 rounded-xl font-bold transition-all ${
                      pathname === "/profile"
                        ? "bg-sky-50 text-sky-600"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <FaUser />
                    Account Settings
                  </Link>
                  
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-3 px-5 py-4 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

