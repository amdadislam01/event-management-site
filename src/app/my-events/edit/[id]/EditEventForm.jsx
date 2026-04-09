"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

const EditEventForm = ({ event, id }) => {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: event,
  });

  const [eventDate, setEventDate] = useState(event?.date ? new Date(event.date) : null);

  useEffect(() => {
    if (event) {
      reset(event);
      if (event.date) {
        setEventDate(new Date(event.date));
      }
    }
  }, [event, reset]);

  const onSubmit = async (data) => {
    if (!eventDate) {
      Swal.fire("Error", "Please select a valid date!", "error");
      return;
    }

    data.date = eventDate.toISOString();
    
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this event?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update Event",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          Swal.fire({
            title: "Event Updated!",
            text: "Your event has been successfully updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
          router.push("/my-events");
        } else {
            Swal.fire({
                title: "No Changes",
                text: "No changes were made to the event.",
                icon: "info",
            });
        }
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
        Edit Event
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Event Title */}
        <div className="flex flex-col">
           <label className="text-sm font-semibold text-gray-700 mb-1">Event Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Event Title"
            className="input-style"
          />
          {errors.title && <p className="error-text">Title is required</p>}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Category</label>
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
          <label className="text-sm font-semibold text-gray-700 mb-1">Location</label>
          <input
            {...register("location", { required: true })}
            placeholder="Location"
            className="input-style"
          />
          {errors.location && (
            <p className="error-text">Location is required</p>
          )}
        </div>

        {/* Date  */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Event Date</label>
          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
            minDate={new Date()}
            placeholderText="Select Event Date"
            className="input-style w-full"
            dateFormat="yyyy-MM-dd"
          />
          {!eventDate && <p className="error-text">Date is required</p>}
        </div>

        {/* Time */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-1">Start Time</label>
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
            <label className="text-sm font-semibold text-gray-700 mb-1">End Time</label>
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
          <label className="text-sm font-semibold text-gray-700 mb-1">Ticket Price</label>
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
          <label className="text-sm font-semibold text-gray-700 mb-1">Total Seats</label>
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
          <label className="text-sm font-semibold text-gray-700 mb-1">Available Seats</label>
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

        {/* Organizer Name */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Organizer Name</label>
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
          <label className="text-sm font-semibold text-gray-700 mb-1">Organizer Email</label>
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
          <label className="text-sm font-semibold text-gray-700 mb-1">Owner Email (Read Only)</label>
          <input
            {...register("ownerEmail")}
            readOnly
            className="input-style bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-700 mb-1">Image URL</label>
          <input
            {...register("image", { required: true })}
            placeholder="Image URL"
            className="input-style"
          />
          {errors.image && <p className="error-text">Image URL required</p>}
        </div>

        {/* Description */}
        <div className="flex flex-col lg:col-span-2">
          <label className="text-sm font-semibold text-gray-700 mb-1">Description</label>
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
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEventForm;
