import { CategoryService } from '../src/categories';

describe('CategoryService', () => {
  it('should return all categories', () => {
    const categories = CategoryService.getAllCategories();
    expect(categories).toBeDefined();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should return a category by key', () => {
    const category = CategoryService.getCategoryByKey('tours_sightseeing');
    expect(category).toBeDefined();
    expect(category?.key).toBe('tours_sightseeing');
    expect(category?.name).toBe('Tours & Sightseeing');
  });

  it('should return undefined for an invalid key', () => {
    const category = CategoryService.getCategoryByKey('invalid_key');
    expect(category).toBeUndefined();
  });

  it('should return a category by name (case-insensitive)', () => {
    const category = CategoryService.getCategoryByName('fitness & wellness');
    expect(category).toBeDefined();
    expect(category?.key).toBe('fitness_wellness');
    expect(category?.name).toBe('Fitness & Wellness');
  });

  it('should return undefined for an invalid name', () => {
    const category = CategoryService.getCategoryByName('Nonexistent Category');
    expect(category).toBeUndefined();
  });

  it('should handle case-insensitive name matching', () => {
    const category = CategoryService.getCategoryByName('TOURS & SIGHTSEEING');
    expect(category).toBeDefined();
    expect(category?.key).toBe('tours_sightseeing');
    expect(category?.name).toBe('Tours & Sightseeing');
  });
});
