import { ImageSourcePropType } from 'react-native';

// Simple color placeholders
const colors = {
    promotions: ['#FF5252', '#536DFE', '#00C853'],
    categories: ['#FF6D00', '#00B0FF', '#651FFF', '#F50057'],
    pizzas: ['#FFC107', '#E91E63', '#3F51B5', '#009688', '#FF5722'],
    sides: ['#8D6E63'],
    profile: ['#607D8B']
};

// Placeholder URL generator (using placeholder.com service)
// We're using URLs that follow a specific color and text pattern
const generatePlaceholderUrl = (width: number, height: number, bgColor: string, text: string): ImageSourcePropType => {
    // This creates a URI that works with placeholder.com's service
    // return { uri: `https://via.placeholder.com/${width}x${height}/${bgColor.replace('#', '')}?text=${encodeURIComponent(text)}` };
    return { uri: `https://picsum.photos/${width}/${height}` };
};

// Actual placeholder assets with proper dimensions
export const PlaceholderImages = {
    // Promotions
    promotion1: generatePlaceholderUrl(560, 320, colors.promotions[0], 'Buy 1 Get 1 Free'),
    promotion2: generatePlaceholderUrl(560, 320, colors.promotions[1], '30% Off Large Pizzas'),
    promotion3: generatePlaceholderUrl(560, 320, colors.promotions[2], 'Free Garlic Bread'),

    // Categories
    categoryPizza: generatePlaceholderUrl(160, 160, colors.categories[0], 'Pizza'),
    categorySides: generatePlaceholderUrl(160, 160, colors.categories[1], 'Sides'),
    categoryDrinks: generatePlaceholderUrl(160, 160, colors.categories[2], 'Drinks'),
    categoryDesserts: generatePlaceholderUrl(160, 160, colors.categories[3], 'Desserts'),

    // Pizza items
    pizza1: generatePlaceholderUrl(200, 200, colors.pizzas[0], 'Pepperoni'),
    pizza2: generatePlaceholderUrl(200, 200, colors.pizzas[1], 'Supreme'),
    pizza3: generatePlaceholderUrl(200, 200, colors.pizzas[2], 'Hawaiian'),
    pizza4: generatePlaceholderUrl(200, 200, colors.pizzas[3], 'BBQ Meatlovers'),
    pizza5: generatePlaceholderUrl(200, 200, colors.pizzas[4], 'Vegetarian'),

    // Side items
    sides1: generatePlaceholderUrl(200, 200, colors.sides[0], 'Garlic Bread'),

    // Profile
    profileAvatar: generatePlaceholderUrl(140, 140, colors.profile[0], 'User')
};

// Function to safely get images
export const getImage = (imageName: string): ImageSourcePropType => {
    // We can't use dynamic requires in React Native, so we need to handle each case separately
    // Instead of trying to dynamically load assets, we'll always return the placeholder images
    // When you have real images, you would add cases for each one

    // Just use placeholder images for now - this makes the app work immediately
    switch (imageName) {
        case 'promotion1': return PlaceholderImages.promotion1;
        case 'promotion2': return PlaceholderImages.promotion2;
        case 'promotion3': return PlaceholderImages.promotion3;
        case 'category-pizza': return PlaceholderImages.categoryPizza;
        case 'category-sides': return PlaceholderImages.categorySides;
        case 'category-drinks': return PlaceholderImages.categoryDrinks;
        case 'category-desserts': return PlaceholderImages.categoryDesserts;
        case 'pizza1': return PlaceholderImages.pizza1;
        case 'pizza2': return PlaceholderImages.pizza2;
        case 'pizza3': return PlaceholderImages.pizza3;
        case 'pizza4': return PlaceholderImages.pizza4;
        case 'pizza5': return PlaceholderImages.pizza5;
        case 'sides1': return PlaceholderImages.sides1;
        case 'profile-avatar': return PlaceholderImages.profileAvatar;
        default: return { uri: 'https://via.placeholder.com/200x200/CCCCCC?text=Missing+Image' };
    }
}; 