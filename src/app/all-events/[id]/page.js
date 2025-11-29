"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useClerk } from "@clerk/nextjs";
import Loading from "../loading";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const currentDate = new Date();
  const {user} = useClerk();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://event-managment-serrver.vercel.app/events/${id}`
        );
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) fetchEvent();
  }, [id]);

  if (!event)
    return <Loading />;

  const eventDate = new Date(event.date);

  const handleBookingSubmit = async () => {
    const bookingData = {
      eventId: event._id,
      eventTitle: event.title,
      eventImage: event.image,
      eventDate: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
      price: event.price,
      userEmail: user?.primaryEmailAddress?.emailAddress, 
    };

    try {
      const res = await fetch(
        "https://event-managment-serrver.vercel.app/booking-ticket",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Booked!",
          text: "Your ticket has been successfully booked.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Failed!",
          text: result.message || "Booking failed. Try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Booking error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Check console.",
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5faff] py-10 px-4 flex justify-center items-start">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-2xl overflow-hidden border border-[#0092b8]/20">
        {/* IMAGE */}
        <div className="relative w-full h-[420px] overflow-hidden">
          <Link
            href="/all-events"
            className="absolute top-4 left-4 z-20 bg-cyan-100 text-gray-800 px-4 py-2 rounded-lg backdrop-blur-md shadow hover:bg-cyan-200 transition font-medium"
          >
            ← Back
          </Link>
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
                {eventDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
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

          {/* STATUS & BOOK BUTTON */}
          <div className="mt-4 flex justify-between items-center">
            <span
              className={`px-4 py-2 w-max text-sm font-semibold rounded-full ${
                eventDate > currentDate
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {eventDate > currentDate ? "Upcoming" : "Completed"}
            </span>

            <button
              onClick={handleBookingSubmit}
              disabled={eventDate <= currentDate}
              className={`px-6 py-3 rounded-xl font-medium shadow-md text-white transition cursor-pointer ${
                eventDate > currentDate
                  ? "bg-[#006aa9] hover:bg-[#0092b8]"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {eventDate > currentDate ? "Book Ticket" : "Completed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
