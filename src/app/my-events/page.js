"use client";

import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";

const MyEvents = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();
  const [events, setEvents] = useState([]);

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  useEffect(() => {
    if (!userEmail) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://event-managment-serrver.vercel.app/my-events?email=${encodeURIComponent(
            userEmail
          )}`
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
        const res = await fetch(`https://event-managment-serrver.vercel.app/events/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();
        if (data.deletedCount > 0) {
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event._id !== id)
          );
          Swal.fire({
            title: "Deleted!",
            text: "Your event has been deleted.",
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
        My Created Events
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center text-lg mt-10">
          You haven’t created any events yet.
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
                    Category
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
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover rounded-md border"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {event.title}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {event.category}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{event.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 text-sm font-medium rounded-full ${
                          event.status === "Upcoming"
                            ? "bg-green-200 text-green-800"
                            : event.status === "Ongoing"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {event.status}
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
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition cursor-pointer">
                          Edit
                        </button>
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

          {/* Mobile Card  */}
          <div className="md:hidden flex flex-col gap-4">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300"
              >
                <div className="relative w-full h-40 sm:h-48">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {event.title}
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-medium">Category:</span>{" "}
                    {event.category}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Date:</span> {event.date}
                  </p>
                  <span
                    className={`px-2 py-1 w-max text-sm font-medium rounded-full ${
                      event.status === "Upcoming"
                        ? "bg-green-200 text-green-800"
                        : event.status === "Ongoing"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {event.status}
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link
                      href={`/all-events/${event._id}`}
                      className="bg-[#0069a9] hover:bg-[#0092b8] text-white px-3 py-1 rounded-md text-sm transition"
                    >
                      View
                    </Link>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition">
                      Edit
                    </button>
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

export default MyEvents;
