import { PinIt } from '../src/pinIt';
import { CategoryService } from '../src/categories';

describe('PinIt', () => {
  const validAudioUrl = 'https://example.com/audio/12345.mp3';
  const validCategoryKey = 'tours_sightseeing';
  const validLocation = { latitude: 40.7128, longitude: -74.0060 };
  const validOptions = {
    title: "Test Tour",
    description: "A test description for a tour.",
    tags: ["test", "tour"]
  };

  beforeAll(() => {
    // Ensure that the category exists in the mock data
    expect(CategoryService.getCategoryByKey(validCategoryKey)).toBeDefined();
  });

  it('should create a valid PIN object', () => {
    const pin = PinIt.createPin(validAudioUrl, validCategoryKey, validLocation, validOptions);

    expect(pin).toBeDefined();
    expect(pin.audioUrl).toBe(validAudioUrl);
    expect(pin.category).toBe(validCategoryKey);
    expect(pin.location).toEqual(validLocation);
    expect(pin.options).toEqual(validOptions);
    expect(pin.createdAt).toBeInstanceOf(Date);
  });

  it('should throw an error if audioUrl is missing', () => {
    expect(() => PinIt.createPin('', validCategoryKey, validLocation)).toThrowError("Audio URL is required.");
  });

  it('should throw an error if category is invalid', () => {
    const invalidCategoryKey = 'nonexistent_category';
    expect(() => PinIt.createPin(validAudioUrl, invalidCategoryKey, validLocation)).toThrowError(`Invalid category: ${invalidCategoryKey}`);
  });

  it('should throw an error if location is missing latitude or longitude', () => {
    const invalidLocation = { latitude: 40.7128, longitude: undefined };
    expect(() => PinIt.createPin(validAudioUrl, validCategoryKey, invalidLocation as any)).toThrowError("A valid location with latitude and longitude is required.");
  });

  it('should create a PIN without options', () => {
    const pin = PinIt.createPin(validAudioUrl, validCategoryKey, validLocation);

    expect(pin).toBeDefined();
    expect(pin.audioUrl).toBe(validAudioUrl);
    expect(pin.category).toBe(validCategoryKey);
    expect(pin.location).toEqual(validLocation);
    expect(pin.options).toBeUndefined();
    expect(pin.createdAt).toBeInstanceOf(Date);
  });
});
