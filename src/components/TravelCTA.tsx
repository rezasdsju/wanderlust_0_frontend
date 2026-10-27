import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";



export default function TravelCTA() {
  return (
    <>
      <section
        aria-labelledby="journey-title"
        className="relative isolate overflow-hidden border-t-2 border-b-2 border-[#22a6ff] bg-slate-950"
      >
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-slate-950/60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,166,255,0.12),transparent_45%)]" />
          <div className="absolute inset-0 opacity-90">
            <Image
              src="/images/Banner.png"
              alt=""
              fill
              className="object-cover object-center grayscale-[0.1] brightness-75"
              sizes="100vw"
            />
          </div>
        </div>

        <div className="mx-auto flex min-h-80 max-w-295 items-center justify-center px-6 py-16 text-center text-white sm:px-8 lg:px-10">
          <div className="w-full max-w-220">
            <div className="mb-4 flex justify-center gap-3">
              <div className="flex h-11.5 w-13 items-center justify-center rounded-md border border-white/15 bg-slate-900/35 text-2xl font-light text-white shadow-lg backdrop-blur-sm">
                14
              </div>
              <div className="flex h-11.5 w-15.5 items-center justify-center rounded-md border border-white/15 bg-slate-900/35 text-2xl font-light text-white shadow-lg backdrop-blur-sm">
                120
              </div>
            </div>

            <h2
              id="journey-title"
              className="text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] font-light tracking-[-0.075em] text-white"
            >
              Ready To Start Your Journey?
            </h2>

            <p className="mx-auto mt-4 max-w-180 text-sm text-white/80 sm:text-base">
              Join thousands of travelers who have discovered the world with us
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 bg-white px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-slate-900 shadow-lg transition-colors hover:bg-slate-200"
              >
                Book Your Trip Today
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
