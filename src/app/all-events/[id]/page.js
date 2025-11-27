"use client";

import ProtectRoute from "@/components/ProtectRoute";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import Loading from "../loading";

const EventDetails = ({ params }) => {
  const { id } = use(params);

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  // Event Data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://event-managment-serrver.vercel.app/events/${id}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  useEffect(() => {
    if (!user) {
      const t = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [loading, user]);

  if (!user) {
    if (loading) {
      return <Loading></Loading>;
    }
    openSignIn();
    return <ProtectRoute />;
  }

  return (
    <div className="min-h-screen bg-[#f5faff] py-10 px-4 flex justify-center items-start">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl overflow-hidden border border-[#0092b8]/20">
        {/* IMAGE */}
        <div className="relative w-full h-[420px] overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-6">
          <div>
            <span className="px-3 py-1 text-sm bg-[#006aa9]/10 text-[#006aa9] rounded-full">
              {event.category}
            </span>
            <h1 className="text-3xl font-bold mt-3 text-[#006aa9]">
              {event.title}
            </h1>
            <p className="text-gray-600 mt-2">{event.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <Item label="Location" value={event.location} />
            <Item label="Date" value={event.date} />
            <Item
              label="Time"
              value={`${event.startTime} - ${event.endTime}`}
            />
            <Item label="Ticket Price" value={`৳ ${event.price}`} />
            <Item label="Capacity" value={event.capacity} />
            <Item label="Available Seats" value={event.availableSeats} />
          </div>

          {/* ORGANIZER INFO */}
          <div className="mt-6 bg-[#006aa9]/10 p-6 rounded-xl border border-[#006aa9]/20">
            <h3 className="text-xl font-bold text-[#006aa9] mb-3">
              Organizer Information
            </h3>
            <p className="text-gray-700">
              <span className="font-semibold text-[#006aa9]">Name:</span>{" "}
              {event.organizerName}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-[#006aa9]">Email:</span>{" "}
              {event.organizerEmail}
            </p>
          </div>

          {/* STATUS */}
          <div className="mt-4 flex justify-between items-center">
            <span
              className={`px-4 py-2 text-sm font-semibold rounded-full ${
                event.status === "Upcoming"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {event.status}
            </span>

            <button className="bg-[#006aa9] hover:bg-[#0092b8] transition text-white px-6 py-3 rounded-xl font-medium shadow-md">
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Item = ({ label, value }) => (
  <div className="bg-[#0092b8]/10 p-5 rounded-xl border border-[#0092b8]/20">
    <p className="text-sm text-gray-500">{label}</p>
    <h2 className="text-lg font-semibold text-[#006aa9]">{value}</h2>
  </div>
);

export default EventDetails;
