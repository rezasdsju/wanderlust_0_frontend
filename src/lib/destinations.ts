import { BASE_API_URL } from "@/lib/api";

export type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
};

export const DESTINATIONS_API = `${BASE_API_URL}/destinations`;
export const FEATURED_DESTINATIONS_API = `${BASE_API_URL}/featured-destinations`;

export type DestinationFilterValues = {
  category: string;
  price: string;
  sort: string;
};

export const PRICE_RANGES = [
  { value: "under-1000", label: "Under $1,000", min: 0, max: 1000 },
  { value: "1000-5000", label: "$1,000 – $5,000", min: 1000, max: 5000 },
  { value: "5000-10000", label: "$5,000 – $10,000", min: 5000, max: 10000 },
  { value: "10000-plus", label: "$10,000+", min: 10000, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { value: "recommended", label: "Sort By" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "departure", label: "Departure: Soonest" },
  { value: "name", label: "Name: A–Z" },
] as const;

export function getCategories(destinations: Destination[]) {
  return [...new Set(destinations.map((destination) => destination.category).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function filterAndSortDestinations(
  destinations: Destination[],
  filters: DestinationFilterValues,
) {
  const range = PRICE_RANGES.find((option) => option.value === filters.price);

  const filtered = destinations.filter((destination) => {
    if (filters.category && destination.category !== filters.category) return false;

    if (range) {
      const price = Number(destination.price);
      if (!Number.isFinite(price) || price < range.min || price >= range.max) return false;
    }

    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      return [...filtered].sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return [...filtered].sort((a, b) => Number(b.price) - Number(a.price));
    case "departure":
      return [...filtered].sort((a, b) => a.departureDate.localeCompare(b.departureDate));
    case "name":
      return [...filtered].sort((a, b) =>
        a.destinationName.localeCompare(b.destinationName),
      );
    default:
      return filtered;
  }
}

export function formatPrice(price: string) {
  const value = Number(price);
  if (!Number.isFinite(value)) return price;

  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

export function formatDuration(duration: string) {
  const days = Number.parseInt(duration, 10);
  if (!Number.isFinite(days) || days <= 0) return duration || "Flexible";

  if (days === 1) return "1 Day";

  return `${days} Days/${days - 1} Night${days - 1 === 1 ? "" : "s"}`;
}
