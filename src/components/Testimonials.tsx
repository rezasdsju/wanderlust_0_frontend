import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person2.png",
  },
];

export default function Testimonials() {
  return (
    <section
      aria-labelledby="travelers-title"
      className="relative border-t-[3px] border-[#22a6ff] bg-[#edf7fa] px-5 pb-14 pt-4 sm:px-8 lg:px-10"
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-6 h-[2px] w-[22px] -translate-x-1/2 bg-[#22a6ff]"
      />
      <div className="mx-auto max-w-[1180px]">
        <div className="flex items-start justify-between gap-4 pt-8">
          <div>
            <span
              aria-hidden="true"
              className="block h-[2px] w-[18px] bg-[#22a6ff]"
            />
            <h2
              id="travelers-title"
              className="mt-4 text-[clamp(2.3rem,4.2vw,4rem)] leading-[0.98] font-light tracking-[-0.07em] text-slate-950"
            >
              What Travelers Say
            </h2>
            <p className="mt-2 text-[0.95rem] text-slate-500">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="mt-3 hidden items-center gap-3 sm:flex">
            <button
              type="button"
              aria-label="Previous testimonials"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-colors hover:border-slate-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition-colors hover:border-slate-400"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {testimonials.map(({ quote, name, location, image }) => (
            <article
              key={name}
              className="grid gap-5 border border-slate-200 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.04)] sm:p-6 lg:grid-cols-[1.25fr_0.9fr] lg:items-center"
            >
              <div className="flex min-h-[220px] flex-col justify-between">
                <p className="max-w-[32ch] text-[1.1rem] leading-[1.35] font-light tracking-[-0.045em] text-slate-900 sm:text-[1.3rem]">
                  &ldquo;{quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                  <span className="inline-block h-4 w-px bg-[#22a6ff]" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-slate-900">— {name}</p>
                    <p>{location}</p>
                  </div>
                </div>
              </div>

              <div className="relative mx-auto h-[180px] w-[180px] overflow-hidden rounded-[18px] bg-slate-200 sm:h-[220px] sm:w-[220px]">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 220px"
                />
              </div>
            </article>
          ))}
        </div>
      </div>

      <span
        aria-hidden="true"
        className="mx-auto mt-10 block h-[2px] w-[22px] bg-[#22a6ff]"
      />
    </section>
  );
}
