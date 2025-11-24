"use client";
import React from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import ProtectRoute from "@/components/ProtectRoute";

const MyEvents = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  if (!user) {
    openSignIn();
    return <ProtectRoute />;
  }
  return (
    <div>
      <h1>My Events</h1>
    </div>
  );
};

export default MyEvents;
