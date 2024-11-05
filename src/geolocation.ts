export interface GeolocationData {
    coords: {
      accuracy: number | null;
      latitude: number | null;
      longitude: number | null;
      altitude: number | null;
      altitudeAccuracy: number | null;
      heading: number | null;
      speed: number | null;
    };
    locatedAt: Date | null;
    error: string | null;
  }

  export function useGeolocation() {
    const data: GeolocationData = {
      coords: {
        accuracy: null,
        latitude: null,
        longitude: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      locatedAt: null,
      error: null,
    };
  
    let watcherId: number | null = null;
  
    const updatePosition = (position: GeolocationPosition) => {
      const { coords } = position;
      data.coords = {
        accuracy: coords.accuracy,
        latitude: coords.latitude,
        longitude: coords.longitude,
        altitude: coords.altitude,
        altitudeAccuracy: coords.altitudeAccuracy,
        heading: coords.heading,
        speed: coords.speed,
      };
      data.locatedAt = new Date();
      data.error = null;
    };
  
    const handleError = (error: GeolocationPositionError) => {
      data.error = error.message;
      pause();
    };
  
    const resume = () => {
      if (!watcherId) {
        watcherId = navigator.geolocation.watchPosition(updatePosition, handleError);
      }
    };
  
    const pause = () => {
      if (watcherId !== null) {
        navigator.geolocation.clearWatch(watcherId);
        watcherId = null;
      }
    };
  
    // Start geolocation on initialization
    resume();
  
    return {
      coords: data.coords,
      locatedAt: data.locatedAt,
      error: data.error,
      resume,
      pause,
    };
  }