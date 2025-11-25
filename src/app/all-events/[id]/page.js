import Image from "next/image";
import React from "react";

const EventDetails = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`https://event-managment-serrver.vercel.app/events/${id}`);
  const event = await res.json();

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

          {/* GRID INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="bg-[#0092b8]/10 p-5 rounded-xl border border-[#0092b8]/20">
              <p className="text-sm text-gray-500">Location</p>
              <h2 className="text-lg font-semibold text-[#006aa9]">
                {event.location}
              </h2>
            </div>

            <div className="bg-[#0092b8]/10 p-5 rounded-xl border border-[#0092b8]/20">
              <p className="text-sm text-gray-500">Date</p>
              <h2 className="text-lg font-semibold text-[#006aa9]">
                {event.date}
              </h2>
            </div>

            <div className="bg-[#0092b8]/10 p-5 rounded-xl border border-[#0092b8]/20">
              <p className="text-sm text-gray-500">Time</p>
              <h2 className="text-lg font-semibold text-[#006aa9]">
                {event.startTime} - {event.endTime}
              </h2>
            </div>

            <div className="bg-[#0092b8]/10 p-5 rounded-xl border border-[#0092b8]/20">
              <p className="text-sm text-gray-500">Ticket Price</p>
              <h2 className="text-lg font-semibold text-[#006aa9]">
                ৳ {event.price}
              </h2>
            </div>

            <div className="bg-[#0092b8]/10 p-5 rounded-xl border border-[#0092b8]/20">
              <p className="text-sm text-gray-500">Capacity</p>
              <h2 className="text-lg font-semibold text-[#006aa9]">
                {event.capacity}
              </h2>
            </div>

            <div className="bg-[#0092b8]/10 p-5 rounded-xl border border-[#0092b8]/20">
              <p className="text-sm text-gray-500">Available Seats</p>
              <h2 className="text-lg font-semibold text-[#006aa9]">
                {event.availableSeats}
              </h2>
            </div>
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

export default EventDetails;