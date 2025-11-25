"use client";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EventForm = () => {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this event?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add Event",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) {
      return;
    }
    fetch("https://event-managment-serrver.vercel.app/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Event Added!",
          text: "Your event has been successfully created.",
          icon: "success",
          confirmButtonText: "OK",
        });
        reset(); 
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Try again.",
          icon: "error",
        });
      });
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
        <input
          {...register("title")}
          placeholder="Event Title"
          className="input-style"
        />

        <input
          {...register("category")}
          placeholder="Category"
          className="input-style"
        />

        <input
          {...register("location")}
          placeholder="Location"
          className="input-style"
        />
        
        <input type="date" {...register("date")} className="input-style" />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="time"
            {...register("startTime")}
            className="input-style"
          />
          <input type="time" {...register("endTime")} className="input-style" />
        </div>

        <input
          type="number"
          {...register("price")}
          placeholder="Ticket Price"
          className="input-style"
        />

        <input
          type="number"
          {...register("capacity")}
          placeholder="Total Seats"
          className="input-style"
        />

        <input
          type="number"
          {...register("availableSeats")}
          placeholder="Available Seats"
          className="input-style"
        />

        <input
          {...register("organizerName")}
          placeholder="Organizer Name"
          className="input-style"
        />

        <input
          type="email"
          {...register("organizerEmail")}
          placeholder="Organizer Email"
          className="input-style"
        />

        <input
          {...register("ownerEmail")}
          defaultValue={user?.primaryEmailAddress?.emailAddress}
          readOnly
          className="input-style bg-gray-100 cursor-not-allowed"
        />

        <input
          {...register("image")}
          placeholder="Image URL"
          className="input-style"
        />

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
          className="lg:col-span-2 bg-linear-to-r from-[#0072FF] to-[#00C6FF] text-white font-semibold py-3 rounded-lg mt-4 hover:opacity-90 transition cursor-pointer"
        >
          Submit Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
