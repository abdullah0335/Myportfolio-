"use client";

import dynamic from "next/dynamic";
import SmoothScroll from "@/components/SmoothScroll";
import Starfield from "@/components/Starfield";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

/** Persistent chrome shared by every page: background, cursor, smooth scroll. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      <Starfield />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  );
}
