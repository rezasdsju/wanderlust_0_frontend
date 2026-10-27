import Link from "next/link";
import DestinationCard from "@/components/DestinationCard";
import DestinationFilters from "@/components/DestinationFilters";
import {
  DESTINATIONS_API,
  filterAndSortDestinations,
  getCategories,
  PRICE_RANGES,
  SORT_OPTIONS,
  type Destination,
} from "@/lib/destinations";

function readParam(value: string | string[] | undefined) {
  return typeof value === "string" ? value : "";
}

export default async function AllDestinationsPage({
  searchParams,
}: PageProps<"/all-destinations">) {
  const params = await searchParams;

  const response = await fetch(DESTINATIONS_API, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Failed to fetch destinations (${response.status})`);
  }

  const destinations: Destination[] = await response.json();
  const categories = getCategories(destinations);

  const requestedCategory = readParam(params.category);
  const requestedPrice = readParam(params.price);
  const requestedSort = readParam(params.sort);

  const filters = {
    category: categories.includes(requestedCategory) ? requestedCategory : "",
    price: PRICE_RANGES.some((range) => range.value === requestedPrice)
      ? requestedPrice
      : "",
    sort: SORT_OPTIONS.some((option) => option.value === requestedSort)
      ? requestedSort
      : "recommended",
  };

  const visibleDestinations = filterAndSortDestinations(destinations, filters);

  return (
    <main className="flex-1 bg-white px-6 py-10 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-[clamp(2rem,4vw,2.5rem)] leading-tight font-light tracking-[-0.065em] text-slate-950">
          Explore All Destinations
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-7">
          <DestinationFilters categories={categories} values={filters} />
        </div>

        <p className="mt-3 text-xs text-slate-500" aria-live="polite">
          Showing {visibleDestinations.length} destination
          {visibleDestinations.length === 1 ? "" : "s"}
        </p>

        {visibleDestinations.length > 0 ? (
          <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDestinations.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-sm border border-dashed border-slate-200 px-6 py-16 text-center">
            <p className="text-sm text-slate-600">
              {destinations.length === 0
                ? "No destinations have been added yet."
                : "No destinations match your filters."}
            </p>
            {destinations.length > 0 ? (
              <Link
                href="/all-destinations"
                className="mt-3 inline-block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1598ff] transition-colors hover:text-[#0d86e8]"
              >
                Clear filters
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
