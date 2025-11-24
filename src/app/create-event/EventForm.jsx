"use client";

import { useForm } from "react-hook-form";

const EventForm = () => {
  const { register, handleSubmit, reset } = useForm();

   const onSubmit = (data) => {
    console.log(data);
    fetch("http://localhost:5000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    reset();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#0A66C2]">
        Create Event
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <input {...register("title")} placeholder="Event Title" className="input-style" />

        <input {...register("category")} placeholder="Category" className="input-style" />

        <input {...register("location")} placeholder="Location" className="input-style" />

        <input {...register("venue")} placeholder="Venue" className="input-style" />

        <input type="date" {...register("date")} className="input-style" />

        <div className="grid grid-cols-2 gap-4">
          <input type="time" {...register("startTime")} className="input-style" />
          <input type="time" {...register("endTime")} className="input-style" />
        </div>

        <input type="number" {...register("price")} placeholder="Ticket Price" className="input-style" />

        <input type="number" {...register("capacity")} placeholder="Total Seats" className="input-style" />

        <input type="number" {...register("availableSeats")} placeholder="Available Seats" className="input-style" />

        <input {...register("organizerName")} placeholder="Organizer Name" className="input-style" />

        <input type="email" {...register("organizerEmail")} placeholder="Organizer Email" className="input-style" />

        <input {...register("image")} placeholder="Image URL" className="input-style" />

        <select {...register("status")} className="input-style">
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>

        <textarea
          {...register("description")}
          placeholder="Description"
          className="input-style h-32 resize-none lg:col-span-2"
        />

        <button
          type="submit"
          className="lg:col-span-2 bg-gradient-to-r from-[#0072FF] to-[#00C6FF] text-white font-semibold py-3 rounded-lg mt-4 hover:opacity-90 transition cursor-pointer"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
