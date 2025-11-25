"use client";

import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const EventForm = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this event?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add Event",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

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
        {/* Event Title */}
        <div className="flex flex-col">
          <input
            {...register("title", { required: true })}
            placeholder="Event Title"
            className="input-style"
          />
          {errors.title && <p className="error-text">Title is required</p>}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <input
            {...register("category", { required: true })}
            placeholder="Category"
            className="input-style"
          />
          {errors.category && (
            <p className="error-text">Category is required</p>
          )}
        </div>

        {/* Location */}
        <div className="flex flex-col">
          <input
            {...register("location", { required: true })}
            placeholder="Location"
            className="input-style"
          />
          {errors.location && (
            <p className="error-text">Location is required</p>
          )}
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <input
            type="date"
            {...register("date", { required: true })}
            className="input-style"
          />
          {errors.date && <p className="error-text">Date is required</p>}
        </div>

        {/* Time */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <input
              type="time"
              {...register("startTime", { required: true })}
              className="input-style"
            />
            {errors.startTime && (
              <p className="error-text">Start time required</p>
            )}
          </div>

          <div className="flex flex-col">
            <input
              type="time"
              {...register("endTime", { required: true })}
              className="input-style"
            />
            {errors.endTime && <p className="error-text">End time required</p>}
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Ticket Price"
            className="input-style"
          />
          {errors.price && <p className="error-text">Price is required</p>}
        </div>

        {/* Capacity */}
        <div className="flex flex-col">
          <input
            type="number"
            {...register("capacity", { required: true })}
            placeholder="Total Seats"
            className="input-style"
          />
          {errors.capacity && (
            <p className="error-text">Capacity is required</p>
          )}
        </div>

        {/* Available Seats */}
        <div className="flex flex-col">
          <input
            type="number"
            {...register("availableSeats", { required: true })}
            placeholder="Available Seats"
            className="input-style"
          />
          {errors.availableSeats && (
            <p className="error-text">Available seats required</p>
          )}
        </div>

        {/*  Name */}
        <div className="flex flex-col">
          <input
            {...register("organizerName", { required: true })}
            placeholder="Organizer Name"
            className="input-style"
          />
          {errors.organizerName && (
            <p className="error-text">Organizer name required</p>
          )}
        </div>

        {/* Organizer Email */}
        <div className="flex flex-col">
          <input
            type="email"
            {...register("organizerEmail", { required: true })}
            placeholder="Organizer Email"
            className="input-style"
          />
          {errors.organizerEmail && (
            <p className="error-text">Organizer email required</p>
          )}
        </div>

        {/* Owner Email */}
        <div className="flex flex-col">
          <input
            {...register("ownerEmail", { required: true })}
            defaultValue={user?.primaryEmailAddress?.emailAddress}
            readOnly
            className="input-style bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <input
            {...register("image", { required: true })}
            placeholder="Image URL"
            className="input-style"
          />
          {errors.image && <p className="error-text">Image URL required</p>}
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <select
            {...register("status", { required: true })}
            className="input-style"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <p className="error-text">Status is required</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col lg:col-span-2">
          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className="input-style h-32 resize-none"
          />
          {errors.description && (
            <p className="error-text">Description is required</p>
          )}
        </div>

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
