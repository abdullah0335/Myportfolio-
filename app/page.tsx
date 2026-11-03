"use client";

import { useCallback, useState } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import SignatureWall from "@/components/SignatureWall";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const finishLoading = useCallback(() => setLoading(false), []);

  return (
    <>
      {loading && <Loader onDone={finishLoading} />}
      <main
        className="relative"
        style={{
          opacity: loading ? 0 : 1,
          transition: "opacity 0.4s ease 0.1s",
        }}
      >
        <Hero ready={!loading} />
        <Work />
        <Skills />
        <SignatureWall />
        <Footer />
      </main>
    </>
  );
}
