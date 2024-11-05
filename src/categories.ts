interface Category {
    key: string;
    name: string;
}

const categories: Category[] = [
    { key: 'tours_sightseeing', name: 'Tours & Sightseeing' },
    { key: 'scavenger_hunts_games', name: 'Scavenger Hunts & Games' },
    { key: 'performances_storytelling', name: 'Performances & Storytelling' },
    { key: 'historical_cultural', name: 'Historical & Cultural Insights' },
    { key: 'nature_wildlife', name: 'Nature & Wildlife' },
    { key: 'food_drink', name: 'Food & Drink Experiences' },
    { key: 'educational', name: 'Educational Content' },
    { key: 'hidden_gems', name: 'Local Hidden Gems' },
    { key: 'events_festivals', name: 'Events & Festivals' },
    { key: 'fitness_wellness', name: 'Fitness & Wellness' },
    { key: 'haunted_mystery', name: 'Haunted & Mystery' },
    { key: 'environmental_awareness', name: 'Environmental Awareness' },
    { key: 'art_murals', name: 'Art & Murals' },
    { key: 'shopping_markets', name: 'Shopping & Local Markets' },
    { key: 'family_friendly', name: 'Family-Friendly Activities' },
    { key: 'health_safety', name: 'Health & Safety' },
    { key: 'personal_journals', name: 'Personal Journals & Diaries' },
    { key: 'public_announcements', name: 'Public Announcements & Alerts' },
];

export class CategoryService {
    // Retrieve all categories
    static getAllCategories(): Category[] {
        return categories;
    }

    // Retrieve a category by key
    static getCategoryByKey(key: string): Category | undefined {
        return categories.find((category) => category.key === key);
    }

    // Retrieve a category by name (case-insensitive)
    static getCategoryByName(name: string): Category | undefined {
        return categories.find((category) => category.name.toLowerCase() === name.toLowerCase());
    }
}