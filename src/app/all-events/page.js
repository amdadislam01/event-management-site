"use client";

import Loading from "@/components/Loading";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://event-managment-serrver.vercel.app/events");
        const data = await res.json();
        setAllEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let filtered = allEvents;

    if (category !== "All") {
      filtered = filtered.filter(
        (event) => event.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, category, allEvents]);

  // categories
  const categories = ["All", ...new Set(allEvents.map((e) => e.category))];

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#0069a8] mb-8">
        All Events
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-[#0069a8]"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-[#0069a8]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : filteredEvents.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          No events found.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
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
      )}
    </div>
  );
};

export default EventsPage;