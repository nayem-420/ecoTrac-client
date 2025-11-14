import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export const useRouteLoading = (duration = 2000) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [location.pathname, duration]);

  return loading;
};
