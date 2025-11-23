"use client";

import { MdCelebration } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-700 to-cyan-600 text-white pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-4 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-sky-600 to-cyan-500 rounded-lg text-white">
              <MdCelebration className="text-xl" />
            </div>
            <span className="font-extrabold text-2xl text-white">
              Event<span className="text-cyan-300">Flow</span>
            </span>
          </div>
          <p className="text-white/80 leading-relaxed">
            Discover, create, and manage events seamlessly with EventFlow. Join the community and never miss an amazing experience!
          </p>
          <div className="flex gap-4 mt-2">
            <div className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer">
              <FaFacebookF className="text-white text-sm" />
            </div>
            <div className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer">
              <FaTwitter className="text-white text-sm" />
            </div>
            <div className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer">
              <FaInstagram className="text-white text-sm" />
            </div>
            <div className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition cursor-pointer">
              <FaLinkedinIn className="text-white text-sm" />
            </div>
          </div>
        </div>

        {/*  Links */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          <p className="hover:text-cyan-200 transition cursor-pointer">Home</p>
          <p className="hover:text-cyan-200 transition cursor-pointer">All Events</p>
          <p className="hover:text-cyan-200 transition cursor-pointer">My Events</p>
          <p className="hover:text-cyan-200 transition cursor-pointer">Create Event</p>
          <p className="hover:text-cyan-200 transition cursor-pointer">Contact Us</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold mb-2">Contact</h2>
          <p className="text-white/80">Email: support@eventflow.com</p>
          <p className="text-white/80">Phone: +880 123 456 789</p>
          <p className="text-white/80">Address: Dhaka, Bangladesh</p>
          <p className="text-white/80">Working Hours: Mon - Fri: 9:00 AM - 6:00 PM</p>
        </div>

      </div>

      {/*  Copyright */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-white/60 text-sm">
        &copy; {new Date().getFullYear()} EventFlow. All rights reserved.
        <p className="text-center font-semibold">Developed By <a href="https://amdadislam.netlify.app/">MD Amdad Islam</a></p>
      </div>
    </footer>
  );
}
