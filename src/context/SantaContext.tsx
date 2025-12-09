import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SantaStatus } from '../types/santa';
import { santaRoute } from '../data/locations';

interface SantaContextType {
  status: SantaStatus;
}

const SantaContext = createContext<SantaContextType | undefined>(undefined);

export function SantaProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [giftsDelivered, setGiftsDelivered] = useState(0);
  const [distanceTraveled, setDistanceTraveled] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % santaRoute.length;
        if (next !== prev) {
          const current = santaRoute[prev];
          const nextLoc = santaRoute[next];
          const distance = calculateDistance(current.lat, current.lng, nextLoc.lat, nextLoc.lng);
          setDistanceTraveled((d) => d + distance);
          setGiftsDelivered((g) => g + current.population);
        }
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const status: SantaStatus = {
    currentLocation: santaRoute[currentIndex],
    nextLocation: santaRoute[(currentIndex + 1) % santaRoute.length],
    giftsDelivered,
    distanceTraveled: Math.round(distanceTraveled),
    currentSpeed: 8500,
    timeToNextStop: 8,
    progressPercentage: (currentIndex / santaRoute.length) * 100,
    isActive: true
  };

  return (
    <SantaContext.Provider value={{ status }}>
      {children}
    </SantaContext.Provider>
  );
}

export function useSanta() {
  const context = useContext(SantaContext);
  if (!context) {
    throw new Error('useSanta must be used within SantaProvider');
  }
  return context;
}
