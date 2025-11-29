"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const MyBookingsPage = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const [events, setEvents] = useState([]);
  const currentDate = new Date();

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  useEffect(() => {
    if (!userEmail) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://event-managment-serrver.vercel.app/booking?email=${encodeURIComponent(userEmail)}`
        );
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, [userEmail]);

  if (!isLoaded) return null;
  if (!user) {
    openSignIn();
    return null;
  }

  // My Events Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://event-managment-serrver.vercel.app/booking/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (data.deletedCount > 0) {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event._id !== id)
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your ticket has been deleted.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: "Failed to delete the event.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Check console.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-6 text-[#0069a9]">
        My Booked Tickets
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center text-lg mt-10">
          You haven’t booked any tickets yet.
        </p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-[#0069a9] text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Image
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-100 divide-y divide-gray-300">
                {events.map((event) => (
                  <tr
                    key={event._id}
                    className="hover:bg-gray-50 transition duration-150"
                  >
                    <td className="px-4 py-3">
                      <div className="w-20 h-16 relative">
                        <Image
                          src={event.eventImage}
                          alt={event.eventTitle}
                          fill
                          className="object-cover rounded-md border"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {event.eventTitle}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 w-max text-sm font-medium rounded-full ${
                          new Date(event.eventDate) > currentDate
                            ? "bg-green-200 text-green-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {new Date(event.eventDate) > currentDate
                          ? "Upcoming"
                          : "Completed"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/all-events/${event._id}`}
                          className="bg-[#0069a9] hover:bg-[#0092b8] text-white px-3 py-1 rounded-md text-sm transition"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden flex flex-col gap-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300"
              >
                <div className="relative w-full h-40 sm:h-48">
                  <Image
                    src={event.eventImage}
                    alt={event.eventTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {event.eventTitle}
                  </h2>
                  <p className="text-gray-600">
                    Date: {new Date(event.eventDate).toLocaleDateString()}
                  </p>
                  <span
                    className={`px-2 py-1 w-max text-sm font-medium rounded-full ${
                      new Date(event.eventDate) > currentDate
                        ? "bg-green-200 text-green-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {new Date(event.eventDate) > currentDate
                      ? "Upcoming"
                      : "Completed"}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link
                      href={`/all-events/${event._id}`}
                      className="bg-[#0069a9] hover:bg-[#0092b8] text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookingsPage;
