import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  {
    label: "Location",
    name: "location",
    type: "text",
    placeholder: "Address, City or Zip",
    defaultValue: undefined,
  },
  {
    label: "Date/Duration",
    name: "duration",
    type: "text",
    placeholder: undefined,
    defaultValue: "Anytime/3 Days",
  },
  {
    label: "Budget",
    name: "budget",
    type: "text",
    placeholder: undefined,
    defaultValue: "$0-$3000",
  },
  {
    label: "People",
    name: "people",
    type: "text",
    placeholder: undefined,
    defaultValue: "5-10",
  },
];

export default function Banner() {
  return (
    <section
      id="destinations"
      aria-labelledby="hero-title"
      className="flex flex-1 flex-col justify-between"
    >
      <div className="flex flex-1 translate-y-4 flex-col items-center justify-center px-5 pb-8 pt-12 text-center text-white sm:pt-8">
        <h1
          id="hero-title"
          className="max-w-3xl text-[clamp(2.5rem,7vw,3.5rem)] leading-[0.98] font-light tracking-[-0.065em]"
        >
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/90 sm:text-sm">
          Explore breathtaking destinations and create unforgettable memories with
          <br className="hidden sm:block" /> our curated travel experiences.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            href="#search"
            className="inline-flex h-8 items-center justify-center gap-3 bg-cyan-500 px-5 text-[10px] font-medium text-white transition-colors hover:bg-cyan-600 sm:px-6"
          >
            EXPLORE NOW
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            href="#destinations"
            className="inline-flex h-8 items-center justify-center bg-white/40 px-5 text-[10px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/55 sm:px-6"
          >
            VIEW DESTINATION
          </Link>
        </div>
      </div>

      <form
        id="search"
        role="search"
        className="grid grid-cols-2 border border-white/25 bg-slate-900/45 text-white backdrop-blur-md sm:grid-cols-[repeat(4,minmax(0,1fr))_112px]"
      >
        {searchFields.map((field) => (
          <label
            key={field.name}
            className="flex min-h-10.5 flex-col justify-center border-b border-r border-white/25 px-3 py-1 last:border-r-0 sm:border-b-0 sm:px-4"
          >
            <span className="text-xs font-medium">{field.label}</span>
            <input
              aria-label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={field.defaultValue}
              className="mt-0.5 w-full bg-transparent text-[10px] text-white/80 outline-none placeholder:text-white/80"
            />
          </label>
        ))}
        <button
          type="submit"
          className="col-span-2 min-h-10 bg-cyan-500 px-5 text-xs font-semibold text-white transition-colors hover:bg-cyan-600 sm:col-span-1 sm:min-h-0"
        >
          Search
        </button>
      </form>
    </section>
  );
}
