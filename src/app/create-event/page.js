"use client";

import React from "react";
import EventForm from "./EventForm";
import ProtectRoute from "@/components/ProtectRoute";
import { useClerk, useUser } from "@clerk/nextjs";

const CreateEvent = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  if (!user) {
    openSignIn();
    return <ProtectRoute />;
  }
  return (
    <div className="max-w-7xl mx-auto px-7 py-10">
      <EventForm />
    </div>
  );
};

export default CreateEvent;
