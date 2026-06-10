import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

const SERVICE_AREA_CITIES = new Set([
  "la plata", "waldorf", "white plains", "indian head", "port tobacco",
  "bryans road", "bowie", "upper marlboro", "clinton", "oxon hill",
  "fort washington", "brandywine", "accokeek", "prince frederick",
  "leonardtown", "lexington park", "washington", "arlington", "alexandria",
  "temple hills", "suitland", "camp springs", "forestville", "capitol heights",
  "lanham", "largo", "springfield", "woodbridge",
]);

function resolveDisplayCity(cfCity: string | null): string | null {
  if (!cfCity) return null;
  const normalized = cfCity.toLowerCase().trim();
  if (!SERVICE_AREA_CITIES.has(normalized)) return null;
  return cfCity
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export const getVisitorGeo = createServerFn({ method: "GET" }).handler(async () => {
  const request = getRequest();
  const cfCity = request?.headers.get("x-cf-city") ?? null;
  return { city: resolveDisplayCity(cfCity) };
});
