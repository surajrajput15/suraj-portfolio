import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { recordVisitorArrival } from '../utils/siteMetrics';

/**
 * Hook to automatically initialize site metrics on initial visit
 * and capture route transitions.
 */
export function useMetrics() {
  const location = useLocation();
  const initialRecordedRef = useRef(false);

  useEffect(() => {
    // Record initial visitor arrival on first load
    if (!initialRecordedRef.current) {
      initialRecordedRef.current = true;
      recordVisitorArrival(location.pathname);
    }
  }, [location.pathname]);
}
