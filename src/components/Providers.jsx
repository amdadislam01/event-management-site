"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Providers({ children }) {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
}
