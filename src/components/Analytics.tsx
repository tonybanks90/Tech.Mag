import { useLocation } from "wouter";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const Analytics = () => {
  const [location] = useLocation();

  useEffect(() => {
    const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (gaMeasurementId) {
      ReactGA.send({ hitType: "pageview", page: location });
    }
  }, [location]);

  return null;
};

export default Analytics;
