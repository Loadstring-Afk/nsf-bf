import { useState, useEffect } from 'react';

export const useTimer = (startDate) => {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeElapsed = () => {
      const now = new Date();
      const diff = now - startDate;

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30.44); // Average month length
      const years = Math.floor(months / 12);

      setTimeElapsed({
        years,
        months: months % 12,
        days: Math.floor(days % 30.44),
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      });
    };

    calculateTimeElapsed();
    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return timeElapsed;
};