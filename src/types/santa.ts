export interface Location {
  city: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  timezone: string;
}

export interface SantaStatus {
  currentLocation: Location;
  nextLocation: Location;
  giftsDelivered: number;
  distanceTraveled: number;
  currentSpeed: number;
  timeToNextStop: number;
  progressPercentage: number;
  isActive: boolean;
}
