import { getImage } from '@/constants/ImagePlaceholders';

export interface Category {
    id: string;
    name: string;
    image: any;
    description: string;
}

export interface CategoryItem {
    id: string;
    name: string;
    image: any;
}

// For the home screen categories
export const homeCategories: CategoryItem[] = [
    {
        id: '1',
        name: 'Pizza',
        image: getImage('category-pizza'),
    },
    {
        id: '2',
        name: 'Sides',
        image: getImage('category-sides'),
    },
    {
        id: '3',
        name: 'Drinks',
        image: getImage('category-drinks'),
    },
    {
        id: '4',
        name: 'Desserts',
        image: getImage('category-desserts'),
    },
];

// For the category detail page
export const detailCategories: { [key: string]: Category } = {
    '1': {
        id: '1',
        name: 'Pizza',
        image: getImage('category-pizza'),
        description: 'Our authentic Italian pizzas are handcrafted with the finest ingredients and baked to perfection in our stone ovens.'
    },
    '2': {
        id: '2',
        name: 'Sides',
        image: getImage('category-sides'),
        description: 'Complete your meal with our delicious sides. From garlic bread to chicken wings, we have something for everyone.'
    },
    '3': {
        id: '3',
        name: 'Drinks',
        image: getImage('category-drinks'),
        description: 'Refresh yourself with our selection of soft drinks, juices, and bottled water.'
    },
    '4': {
        id: '4',
        name: 'Desserts',
        image: getImage('category-desserts'),
        description: 'End your meal on a sweet note with our delicious desserts. From chocolate lava cake to ice cream, we have the perfect treat.'
    },
};

// For the menu page categories (pizza types)
export const menuCategories = [
    { id: '1', name: 'Best Sellers' },
    { id: '2', name: 'Premium' },
    { id: '3', name: 'Traditional' },
    { id: '4', name: 'Value Range' },
    { id: '5', name: 'Vegan' },
]; 