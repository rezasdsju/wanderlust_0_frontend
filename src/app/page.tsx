import Image from "next/image";
import Banner from "@/components/Banner";

import Testimonials from "@/components/Testimonials";

import WhyChoose from "@/components/WhyChoose";
import TravelCTA from "@/components/TravelCTA";

export default function Home() {
  return (
    <>
      <main
        id="top"
        className="relative isolate flex min-h-svh flex-col overflow-hidden border-2 border-cyan-500 bg-slate-950"
      >
        <Image
          src="/images/Banner.png"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover -z-20"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-slate-950/20"
        />
       
        <Banner />
      </main>
      <WhyChoose />
      <Testimonials />
      <TravelCTA />
    </>
  );
}
