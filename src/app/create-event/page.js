"use client";

import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";
import ProtectRoute from "@/components/ProtectRoute";
import { useSession, signIn } from "next-auth/react";
import Loading from "../all-events/loading";

const CreateEvent = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading" || !user) {
      const t = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(t);
    }
  }, [loading, user, status]);

  if (status === "loading" || (loading && !user)) {
    return <Loading></Loading>;
  }

  if (!user) {
    signIn("google");
    return <ProtectRoute />;
  }
  return (
    <div className="max-w-7xl mx-auto px-7 py-10">
      <EventForm />
    </div>
  );
};

export default CreateEvent;
