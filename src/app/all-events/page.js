import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const res = await fetch("http://localhost:5000/events", {
    cache: "no-store",
  });
  const allEvents = await res.json();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#0069a8] mb-10">
        All Events
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {allEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden border border-gray-200 transition-all duration-300 flex flex-col"
          >
            <div className="relative w-full h-52 md:h-60 lg:h-64">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-2xl font-bold mb-3 text-[#0069a8]">
                {event.title}
              </h2>

              <div className="text-sm text-gray-500 space-y-1 mb-4">
                <p>
                  <strong>Category:</strong> {event.category} |{" "}
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Date:</strong> {event.date} | <strong>Time:</strong>{" "}
                  {event.startTime} - {event.endTime}
                </p>
                <p>
                  <strong>Price:</strong> ${event.price} |{" "}
                  <strong>Available Seats:</strong> {event.availableSeats}
                </p>
              </div>

              <Link
                href={`/all-events/${event._id}`}
                className="mt-auto px-6 py-3 rounded-xl text-center font-semibold transition-colors duration-300 text-white bg-[#0069a8] hover:bg-[#0092b8] cursor-pointer"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
