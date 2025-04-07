export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    addresses?: Address[];
    paymentMethods?: PaymentMethod[];
    favoriteOrders?: string[];
    notificationSettings: {
        pushEnabled: boolean;
        specialOffersEnabled: boolean;
    };
}

export interface Address {
    id: string;
    title: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    isDefault: boolean;
}

export interface PaymentMethod {
    id: string;
    type: 'credit' | 'debit' | 'paypal';
    cardNumber?: string;
    expiryDate?: string;
    cardholderName?: string;
    isDefault: boolean;
}

// Mock user data
export const mockUser: User = {
    id: 'user1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    addresses: [
        {
            id: 'addr1',
            title: 'Home',
            street: '123 Main Street',
            city: 'Sydney',
            state: 'NSW',
            postalCode: '2000',
            isDefault: true
        },
        {
            id: 'addr2',
            title: 'Work',
            street: '456 Business Ave',
            apartment: 'Suite 500',
            city: 'Melbourne',
            state: 'VIC',
            postalCode: '3000',
            isDefault: false
        }
    ],
    paymentMethods: [
        {
            id: 'pay1',
            type: 'credit',
            cardNumber: '•••• •••• •••• 1234',
            expiryDate: '06/25',
            cardholderName: 'John Doe',
            isDefault: true
        },
        {
            id: 'pay2',
            type: 'paypal',
            isDefault: false
        }
    ],
    favoriteOrders: ['order1', 'order2'],
    notificationSettings: {
        pushEnabled: true,
        specialOffersEnabled: true
    }
};

// Mock orders for the orders screen
export interface Order {
    id: string;
    orderNumber: string;
    date: string;
    status: 'pending' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled';
    total: string;
    items: OrderItem[];
    deliveryAddress: string;
    estimatedDeliveryTime?: string;
}

export interface OrderItem {
    id: string;
    name: string;
    price: string;
    quantity: number;
    options?: string[];
}

export const mockOrders: Order[] = [
    {
        id: 'order1',
        orderNumber: 'PH12345',
        date: '2023-06-15 19:30',
        status: 'delivered',
        total: '$35.97',
        items: [
            {
                id: '1',
                name: 'Pepperoni Pizza (Large)',
                price: '$18.99',
                quantity: 1,
                options: ['Extra Cheese']
            },
            {
                id: '6',
                name: 'Garlic Bread',
                price: '$4.99',
                quantity: 2
            },
            {
                id: '9',
                name: 'Coke (600ml)',
                price: '$3.99',
                quantity: 2
            }
        ],
        deliveryAddress: '123 Main Street, Sydney, NSW 2000'
    },
    {
        id: 'order2',
        orderNumber: 'PH12346',
        date: '2023-06-10 18:15',
        status: 'delivered',
        total: '$52.97',
        items: [
            {
                id: '2',
                name: 'Supreme Pizza (Medium)',
                price: '$18.99',
                quantity: 1
            },
            {
                id: '3',
                name: 'Hawaiian Pizza (Medium)',
                price: '$14.99',
                quantity: 1
            },
            {
                id: '7',
                name: 'Chicken Wings (12 Pieces)',
                price: '$17.99',
                quantity: 1
            }
        ],
        deliveryAddress: '456 Business Ave, Suite 500, Melbourne, VIC 3000'
    },
    {
        id: 'order3',
        orderNumber: 'PH12347',
        date: '2023-06-05 20:45',
        status: 'on_the_way',
        total: '$29.97',
        items: [
            {
                id: '5',
                name: 'Vegetarian Pizza (Large)',
                price: '$19.99',
                quantity: 1
            },
            {
                id: '8',
                name: 'Potato Wedges',
                price: '$6.99',
                quantity: 1
            },
            {
                id: '10',
                name: 'Sprite (600ml)',
                price: '$3.99',
                quantity: 1
            }
        ],
        deliveryAddress: '123 Main Street, Sydney, NSW 2000',
        estimatedDeliveryTime: '30-45 minutes'
    }
]; 