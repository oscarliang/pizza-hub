import { getImage } from '@/constants/ImagePlaceholders';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: any;
    sizes: { size: string; price: number }[];
    toppings: { id: string; name: string; price: number }[];
    category?: string;
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: string;
    image: any;
    category?: string;
}

// For the product detail page
export const products: { [key: string]: Product } = {
    '1': {
        id: '1',
        name: 'Pepperoni Pizza',
        description: 'Our classic pepperoni pizza features a traditional hand-tossed crust topped with our special tomato sauce, generous layers of mozzarella cheese and pepperoni slices.',
        price: '$15.99',
        image: getImage('pizza1'),
        category: '1',
        sizes: [
            { size: 'Small', price: 12.99 },
            { size: 'Medium', price: 15.99 },
            { size: 'Large', price: 18.99 },
        ],
        toppings: [
            { id: '1', name: 'Extra Cheese', price: 2 },
            { id: '2', name: 'Mushrooms', price: 1.5 },
            { id: '3', name: 'Onions', price: 1 },
            { id: '4', name: 'Bell Peppers', price: 1.5 },
            { id: '5', name: 'Extra Pepperoni', price: 2 },
        ]
    },
    '2': {
        id: '2',
        name: 'Supreme Pizza',
        description: 'The ultimate pizza experience loaded with pepperoni, ham, beef, mushrooms, onions, green capsicum, and olives on our signature sauce and mozzarella cheese.',
        price: '$18.99',
        image: getImage('pizza2'),
        category: '1',
        sizes: [
            { size: 'Small', price: 15.99 },
            { size: 'Medium', price: 18.99 },
            { size: 'Large', price: 21.99 },
        ],
        toppings: [
            { id: '1', name: 'Extra Cheese', price: 2 },
            { id: '2', name: 'Mushrooms', price: 1.5 },
            { id: '3', name: 'Onions', price: 1 },
            { id: '4', name: 'Bell Peppers', price: 1.5 },
            { id: '5', name: 'Extra Pepperoni', price: 2 },
        ]
    },
    '3': {
        id: '3',
        name: 'Hawaiian Pizza',
        description: 'A tropical twist on our classic pizza with juicy ham and sweet pineapple chunks on our signature tomato sauce and mozzarella cheese.',
        price: '$14.99',
        image: getImage('pizza3'),
        category: '1',
        sizes: [
            { size: 'Small', price: 11.99 },
            { size: 'Medium', price: 14.99 },
            { size: 'Large', price: 17.99 },
        ],
        toppings: [
            { id: '1', name: 'Extra Cheese', price: 2 },
            { id: '2', name: 'Extra Ham', price: 2 },
            { id: '3', name: 'Extra Pineapple', price: 1.5 },
            { id: '4', name: 'Bacon', price: 2 },
            { id: '5', name: 'BBQ Sauce Swirl', price: 1 },
        ]
    },
    '4': {
        id: '4',
        name: 'BBQ Meatlovers',
        description: 'A carnivore\'s delight featuring BBQ sauce, beef, pepperoni, ham, bacon, and mozzarella cheese for the ultimate meat experience.',
        price: '$19.99',
        image: getImage('pizza4'),
        category: '1',
        sizes: [
            { size: 'Small', price: 16.99 },
            { size: 'Medium', price: 19.99 },
            { size: 'Large', price: 22.99 },
        ],
        toppings: [
            { id: '1', name: 'Extra Cheese', price: 2 },
            { id: '2', name: 'Extra Beef', price: 2 },
            { id: '3', name: 'Extra Bacon', price: 2 },
            { id: '4', name: 'Onions', price: 1 },
            { id: '5', name: 'Jalapeños', price: 1.5 },
        ]
    },
    '5': {
        id: '5',
        name: 'Vegetarian',
        description: 'A vegetarian delight with fresh tomatoes, mushrooms, onions, green capsicum, olives, and mozzarella cheese on our signature tomato sauce.',
        price: '$16.99',
        image: getImage('pizza5'),
        category: '1',
        sizes: [
            { size: 'Small', price: 13.99 },
            { size: 'Medium', price: 16.99 },
            { size: 'Large', price: 19.99 },
        ],
        toppings: [
            { id: '1', name: 'Extra Cheese', price: 2 },
            { id: '2', name: 'Extra Mushrooms', price: 1.5 },
            { id: '3', name: 'Extra Olives', price: 1.5 },
            { id: '4', name: 'Spinach', price: 1.5 },
            { id: '5', name: 'Feta Cheese', price: 2 },
        ]
    },
    '6': {
        id: '6',
        name: 'Garlic Bread',
        description: 'Freshly baked bread with garlic butter, the perfect side to complement your pizza.',
        price: '$4.99',
        image: getImage('sides1'),
        category: '2',
        sizes: [
            { size: 'Regular', price: 4.99 },
            { size: 'Family', price: 7.99 },
        ],
        toppings: [
            { id: '1', name: 'Cheese', price: 1 },
            { id: '2', name: 'Herbs', price: 0.5 },
        ]
    },
    '7': {
        id: '7',
        name: 'Chicken Wings',
        description: 'Spicy chicken wings with blue cheese dip, a perfect accompaniment to your pizza.',
        price: '$9.99',
        image: getImage('sides2'),
        category: '2',
        sizes: [
            { size: '6 Pieces', price: 9.99 },
            { size: '12 Pieces', price: 17.99 },
        ],
        toppings: [
            { id: '1', name: 'BBQ Sauce', price: 1 },
            { id: '2', name: 'Ranch Dip', price: 1 },
            { id: '3', name: 'Hot Sauce', price: 1 },
        ]
    },
    '8': {
        id: '8',
        name: 'Potato Wedges',
        description: 'Seasoned potato wedges with sour cream and sweet chili sauce',
        price: '$6.99',
        image: getImage('sides3'),
        category: '2',
        sizes: [
            { size: 'Regular', price: 6.99 },
            { size: 'Large', price: 9.99 },
        ],
        toppings: [
            { id: '1', name: 'Extra Sour Cream', price: 0.5 },
            { id: '2', name: 'Extra Sweet Chili', price: 0.5 },
        ]
    },
    '9': {
        id: '9',
        name: 'Coke',
        description: '600ml bottle',
        price: '$3.99',
        image: getImage('drink1'),
        category: '3',
        sizes: [
            { size: '600ml', price: 3.99 },
            { size: '1.25L', price: 5.99 },
        ],
        toppings: []
    },
    '10': {
        id: '10',
        name: 'Sprite',
        description: '600ml bottle',
        price: '$3.99',
        image: getImage('drink2'),
        category: '3',
        sizes: [
            { size: '600ml', price: 3.99 },
            { size: '1.25L', price: 5.99 },
        ],
        toppings: []
    },
    '11': {
        id: '11',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey center',
        price: '$7.99',
        image: getImage('dessert1'),
        category: '4',
        sizes: [
            { size: 'Single', price: 7.99 },
            { size: 'Double', price: 14.99 },
        ],
        toppings: [
            { id: '1', name: 'Ice Cream', price: 2 },
            { id: '2', name: 'Chocolate Sauce', price: 1 },
        ]
    },
    '12': {
        id: '12',
        name: 'New York Cheesecake',
        description: 'Classic New York style cheesecake',
        price: '$6.99',
        image: getImage('dessert2'),
        category: '4',
        sizes: [
            { size: 'Slice', price: 6.99 },
            { size: 'Whole Cake', price: 34.99 },
        ],
        toppings: [
            { id: '1', name: 'Strawberry Topping', price: 1.5 },
            { id: '2', name: 'Whipped Cream', price: 1 },
        ]
    }
};

// Menu items for menu screen
export const menuItems: MenuItem[] = [
    {
        id: '1',
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, special tomato sauce',
        price: '$15.99',
        image: getImage('pizza1'),
    },
    {
        id: '2',
        name: 'Supreme Pizza',
        description: 'Pepperoni, ham, beef, mushrooms, onions, capsicum, olives',
        price: '$18.99',
        image: getImage('pizza2'),
    },
    {
        id: '3',
        name: 'Hawaiian Pizza',
        description: 'Ham, pineapple, mozzarella',
        price: '$14.99',
        image: getImage('pizza3'),
    },
    {
        id: '4',
        name: 'BBQ Meatlovers',
        description: 'BBQ sauce, beef, pepperoni, ham, bacon, mozzarella',
        price: '$19.99',
        image: getImage('pizza4'),
    },
    {
        id: '5',
        name: 'Vegetarian',
        description: 'Tomato, mushrooms, onions, capsicum, olives, mozzarella',
        price: '$16.99',
        image: getImage('pizza5'),
    },
];

// Category menu items for the category detail page
export const categoryMenuItems: MenuItem[] = [
    {
        id: '1',
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, special tomato sauce',
        price: '$15.99',
        image: getImage('pizza1'),
        category: '1'
    },
    {
        id: '2',
        name: 'Supreme Pizza',
        description: 'Pepperoni, ham, beef, mushrooms, onions, capsicum, olives',
        price: '$18.99',
        image: getImage('pizza2'),
        category: '1'
    },
    {
        id: '3',
        name: 'Hawaiian Pizza',
        description: 'Ham, pineapple, mozzarella',
        price: '$14.99',
        image: getImage('pizza3'),
        category: '1'
    },
    {
        id: '4',
        name: 'BBQ Meatlovers',
        description: 'BBQ sauce, beef, pepperoni, ham, bacon, mozzarella',
        price: '$19.99',
        image: getImage('pizza4'),
        category: '1'
    },
    {
        id: '5',
        name: 'Vegetarian',
        description: 'Tomato, mushrooms, onions, capsicum, olives, mozzarella',
        price: '$16.99',
        image: getImage('pizza5'),
        category: '1'
    },
    {
        id: '6',
        name: 'Garlic Bread',
        description: 'Freshly baked bread with garlic butter',
        price: '$4.99',
        image: getImage('sides1'),
        category: '2'
    },
    {
        id: '7',
        name: 'Chicken Wings',
        description: 'Spicy chicken wings with blue cheese dip',
        price: '$9.99',
        image: getImage('sides2'),
        category: '2'
    },
    {
        id: '8',
        name: 'Potato Wedges',
        description: 'Seasoned potato wedges with sour cream and sweet chili sauce',
        price: '$6.99',
        image: getImage('sides3'),
        category: '2'
    },
    {
        id: '9',
        name: 'Coke',
        description: '600ml bottle',
        price: '$3.99',
        image: getImage('drink1'),
        category: '3'
    },
    {
        id: '10',
        name: 'Sprite',
        description: '600ml bottle',
        price: '$3.99',
        image: getImage('drink2'),
        category: '3'
    },
    {
        id: '11',
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with a gooey center',
        price: '$7.99',
        image: getImage('dessert1'),
        category: '4'
    },
    {
        id: '12',
        name: 'New York Cheesecake',
        description: 'Classic New York style cheesecake',
        price: '$6.99',
        image: getImage('dessert2'),
        category: '4'
    }
]; 