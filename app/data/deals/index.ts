import { getImage } from '@/constants/ImagePlaceholders';

export interface PromotionItem {
    id: string;
    title: string;
    image: any;
    discount: string;
}

export interface DealItem {
    id: string;
    title: string;
    description: string;
    image: any;
    discount: string;
    code: string;
    validUntil: string;
    terms: string[];
}

// Home screen promotions
export const promotions: PromotionItem[] = [
    {
        id: '1',
        title: 'Buy 1 Get 1 Free',
        image: getImage('promotion1'),
        discount: 'Use code: BOGO',
    },
    {
        id: '2',
        title: '30% Off on Large Pizzas',
        image: getImage('promotion2'),
        discount: 'Use code: LARGE30',
    },
    {
        id: '3',
        title: 'Free Garlic Bread',
        image: getImage('promotion3'),
        discount: 'On orders above $30',
    },
];

// Detailed deals for the deal detail page
export const deals: { [key: string]: DealItem } = {
    '1': {
        id: '1',
        title: 'Buy 1 Get 1 Free',
        description: 'Order any large pizza and get another one absolutely free! Perfect for sharing with family and friends.',
        image: getImage('promotion1'),
        discount: 'Get a free pizza',
        code: 'BOGO',
        validUntil: 'June 30, 2023',
        terms: [
            'Valid on large pizzas only',
            'Not valid with any other offer',
            'Delivery fee applies',
            'Available at participating stores only'
        ]
    },
    '2': {
        id: '2',
        title: '30% Off on Large Pizzas',
        description: 'Enjoy 30% off on all large pizzas when you order online. Perfect for game nights or family gatherings!',
        image: getImage('promotion2'),
        discount: '30% off',
        code: 'LARGE30',
        validUntil: 'May 15, 2023',
        terms: [
            'Valid on large pizzas only',
            'Not valid with any other offer',
            'Discount applies to pizza base price only',
            'Additional toppings charged at full price'
        ]
    },
    '3': {
        id: '3',
        title: 'Free Garlic Bread',
        description: 'Get a free garlic bread with any order above $30. The perfect side to complement your pizza!',
        image: getImage('promotion3'),
        discount: 'Free garlic bread',
        code: 'FREEBREAD',
        validUntil: 'Ongoing',
        terms: [
            'Valid on orders above $30',
            'Not valid with any other offer',
            'One free garlic bread per order',
            'Subject to availability'
        ]
    },
}; 