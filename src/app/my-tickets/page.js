"use client";

import React from "react";
import ProtectRoute from "@/components/ProtectRoute";
import { useClerk, useUser } from "@clerk/nextjs";


const MyTikets = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  if (!user) {
    openSignIn();
    return <ProtectRoute />;
  }
  return (
    <div>
      <h1>My Tiket page</h1>
    </div>
  );
};

export default MyTikets;
