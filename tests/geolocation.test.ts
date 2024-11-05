// tests/geolocation.test.ts
import { useGeolocation } from '../src/geolocation';

describe('useGeolocation', () => {
  beforeAll(() => {
    // Define `navigator.geolocation` if it doesn’t already exist and set default no-op for `watchPosition`
    if (!global.navigator.geolocation) {
      Object.defineProperty(global.navigator, 'geolocation', {
        writable: true,
        value: {
          watchPosition: jest.fn(), // Default to no-op
          clearWatch: jest.fn(),
        },
      });
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with null coordinates and no error', () => {
    const { coords, error, locatedAt } = useGeolocation();

    expect(coords).toEqual({
      accuracy: null,
      latitude: null,
      longitude: null,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    });
    expect(locatedAt).toBeNull();
    expect(error).toBeNull();
  });

  test('calls navigator.geolocation.watchPosition on resume', () => {
    // Override `watchPosition` for this specific test
    (navigator.geolocation.watchPosition as jest.Mock).mockImplementation((successCallback) => {
      successCallback({
        coords: {
          accuracy: 10,
          latitude: 45.0,
          longitude: -93.0,
          altitude: 300,
          altitudeAccuracy: 5,
          heading: 90,
          speed: 10,
        },
        timestamp: Date.now(),
      });
      return 1; // Mocked watcher ID
    });

    const { resume } = useGeolocation();
    resume();

    expect(navigator.geolocation.watchPosition).toHaveBeenCalled();
  });

  test('calls navigator.geolocation.clearWatch on pause', () => {
    const { resume, pause } = useGeolocation();
    resume();
    pause();

    expect(navigator.geolocation.clearWatch).toHaveBeenCalled();
  });

  test('updates data on successful position retrieval', () => {
    (navigator.geolocation.watchPosition as jest.Mock).mockImplementation((successCallback) => {
      successCallback({
        coords: {
          accuracy: 10,
          latitude: 45.0,
          longitude: -93.0,
          altitude: 300,
          altitudeAccuracy: 5,
          heading: 90,
          speed: 10,
        },
        timestamp: Date.now(),
      });
    });

    const { coords, locatedAt, error } = useGeolocation();

    expect(coords.latitude).toBe(45.0);
    expect(coords.longitude).toBe(-93.0);
    expect(coords.accuracy).toBe(10);
    expect(coords.altitude).toBe(300);
    expect(coords.altitudeAccuracy).toBe(5);
    expect(coords.heading).toBe(90);
    expect(coords.speed).toBe(10);
    expect(locatedAt).not.toBeNull();
    expect(error).toBeNull();
  });

  test('handles error on position retrieval failure', () => {
    (navigator.geolocation.watchPosition as jest.Mock).mockImplementation(
      (_successCallback, errorCallback) => {
        errorCallback({
          code: 1,
          message: 'User denied Geolocation',
        });
      }
    );

    const { error } = useGeolocation();

    expect(error).toBe('User denied Geolocation');
  });
});
