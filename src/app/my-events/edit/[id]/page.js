"use client";

import React, { useEffect, useState } from "react";
import EditEventForm from "./EditEventForm";
import ProtectRoute from "@/components/ProtectRoute";
import { useSession, signIn } from "next-auth/react";
import Loading from "../../../all-events/loading";
import { useParams } from "next/navigation";

const EditEvent = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;
    
    if (!user) {
      signIn("google");
      return;
    }

    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user, status]);

  if (status === "loading" || loading) {
    return <Loading />;
  }

  if (!user) {
    return <ProtectRoute />;
  }

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-800">Event not found</h2>
        <p className="text-gray-600">The event you are looking for does not exist or has been deleted.</p>
      </div>
    );
  }

  // Check if the current user is the owner
  if (event.ownerEmail !== user.email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-600">You do not have permission to edit this event.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-7 py-10">
      <EditEventForm event={event} id={id} />
    </div>
  );
};

export default EditEvent;
