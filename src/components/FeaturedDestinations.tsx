import FeaturedDestinationsCarousel from "@/components/FeaturedDestinationsCarousel";
import {
  FEATURED_DESTINATIONS_API,
  type Destination,
} from "@/lib/destinations";

export default async function FeaturedDestinations() {
  const featuredDestinations = await getFeaturedDestinations();

  if (featuredDestinations.length === 0) {
    return null;
  }

  return (
    <FeaturedDestinationsCarousel destinations={featuredDestinations} />
  );
}

async function getFeaturedDestinations(): Promise<Destination[]> {
  try {
    const response = await fetch(FEATURED_DESTINATIONS_API, {
      cache: "no-store",
    });

    if (!response.ok) return [];

    return (await response.json()) as Destination[];
  } catch {
    return [];
  }
}
