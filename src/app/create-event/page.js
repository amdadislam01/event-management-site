"use client";

import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";
import ProtectRoute from "@/components/ProtectRoute";
import { useClerk, useUser } from "@clerk/nextjs";
import Loading from "../all-events/loading";

const CreateEvent = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const t = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [loading, user]);

  if (!user) {
    if (loading) {
      return <Loading></Loading>;
    }
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
