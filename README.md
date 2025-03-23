# Pizza Hub 🍕

A cross-platform mobile application for ordering pizza, similar to the Domino's app, built with React Native and Expo.

## Features

- **Home Screen**: Featured items, promotions, and categories
- **Menu**: Browse menu by categories with customization options
- **Cart**: Add/remove items, apply promo codes, and checkout
- **Order Tracking**: Track your orders in real-time
- **User Profile**: Manage personal information, addresses, and payment methods
- **Authentication**: Sign up, login, and profile management

## Screenshots

*Screenshots will be added once the app is fully deployed*

## Tech Stack

- React Native with Expo
- TypeScript
- Expo Router for navigation
- Expo Vector Icons
- AsyncStorage for local data persistence

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pizza-hub.git
cd pizza-hub
```

2. Install dependencies
```bash
npm install
```

3. Run the app
```bash
npm start
```

4. Open the app on your device using Expo Go or run on a simulator/emulator
```bash
npm run ios      # for iOS simulator
npm run android  # for Android emulator
```

## Project Structure

```
pizza-hub/
├── app/                     # Main application code
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── index.tsx        # Home screen
│   │   ├── menu.tsx         # Menu screen
│   │   ├── cart.tsx         # Cart screen
│   │   ├── orders.tsx       # Orders screen
│   │   ├── profile.tsx      # Profile screen
│   │   └── _layout.tsx      # Tab navigation layout
│   └── _layout.tsx          # Main app layout
├── assets/                  # Images, fonts and other static assets
├── components/              # Reusable components
├── constants/               # Constants like colors, sizes, etc.
└── hooks/                   # Custom hooks
```

## Development Roadmap

- [ ] Implement user authentication
- [ ] Add pizza customization
- [ ] Integrate payment methods
- [ ] Add real-time order tracking
- [ ] Implement push notifications
- [ ] Add user reviews and ratings

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
