import { useEffect, useState } from "react";
import { getPublishedReferences } from "../services/referencesApi";

/**
 * Expone las referencias publicadas del portal.
 * status: "loading" mientras se resuelve la petición compartida, "ready" al terminar
 * (con lista vacía si no hay datos o la API no respondió).
 */
export const usePublishedReferences = () => {
  const [state, setState] = useState({ status: "loading", references: [] });

  useEffect(() => {
    let active = true;
    getPublishedReferences().then((references) => {
      if (active) {
        setState({ status: "ready", references });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return state;
};
