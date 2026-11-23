/**
 * Cliente del endpoint público del Portal de Referencias.
 * GET {VITE_REFERENCES_API_URL}/public/references → sólo referencias publicadas,
 * ya sanitizadas por el backend (sin email ni feedback privado).
 *
 * Si la variable no está definida, la API falla o tarda más de REQUEST_TIMEOUT_MS,
 * devuelve [] y la sección simplemente no se muestra.
 */

const REQUEST_TIMEOUT_MS = 10000;

let cachedRequest = null;

const buildEndpoint = () => {
  const raw = (import.meta.env.VITE_REFERENCES_API_URL || "").trim().replace(/\/+$/, "");
  if (!raw) {
    return null;
  }
  const base = raw.endsWith("/api") ? raw : `${raw}/api`;
  return `${base}/public/references`;
};

const isValidReference = (ref) =>
  ref &&
  typeof ref.recommendation === "string" &&
  ref.recommendation.trim() !== "" &&
  typeof ref.firstName === "string" &&
  ref.firstName.trim() !== "";

const sortReferences = (a, b) => {
  if (Boolean(a.isFeatured) !== Boolean(b.isFeatured)) {
    return a.isFeatured ? -1 : 1;
  }
  return (Date.parse(b.createdAt) || 0) - (Date.parse(a.createdAt) || 0);
};

const fetchReferences = async () => {
  const endpoint = buildEndpoint();
  if (!endpoint) {
    return [];
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(endpoint, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const json = await response.json();
    const list = Array.isArray(json?.data) ? json.data : [];
    return list.filter(isValidReference).sort(sortReferences);
  } catch (error) {
    console.warn("Referencias no disponibles:", error?.name === "AbortError" ? "timeout" : error?.message);
    return [];
  } finally {
    clearTimeout(timeoutId);
  }
};

/**
 * Devuelve las referencias publicadas, destacadas primero y luego por fecha descendente.
 * La promesa se memoiza: Navbar y la sección comparten un único fetch por carga de página.
 */
export const getPublishedReferences = () => {
  if (!cachedRequest) {
    cachedRequest = fetchReferences();
  }
  return cachedRequest;
};

/** Sólo para tests: descarta la promesa memoizada. */
export const resetReferencesCache = () => {
  cachedRequest = null;
};
