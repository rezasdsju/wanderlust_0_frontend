const FALLBACK_BASE_API_URL = "http://localhost:5000";

const configuredBaseApiUrl =
  process.env.NEXT_PUBLIC_BASE_API_URL?.trim() ||
  process.env.BASE_API_URL?.trim() ||
  FALLBACK_BASE_API_URL;

/** Backend base URL without a trailing slash. */
export const BASE_API_URL = configuredBaseApiUrl.replace(/\/+$/, "");
