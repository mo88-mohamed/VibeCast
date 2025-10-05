# VibeCast 🎙️

A modern React Native podcast application that allows users to discover, search, and listen to their favorite podcasts.

## Features

- **Browse Podcasts**: Discover trending and popular podcasts
- **Search**: Find podcasts by title, author, or keywords
- **Audio Player**: Built-in audio player with playback controls
- **Favorites**: Save your favorite podcasts for quick access
- **Bottom Tab Navigation**: Easy navigation between Home, Search, Favorites, and Podcast screens

## Tech Stack

- **React Native** (v0.81.4) - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation library with bottom tabs and stack navigation
- **React Native Sound** - Audio playback functionality
- **Context API** - State management for favorites
- **Vector Icons** - FontAwesome icons for UI elements

## Prerequisites

Before you begin, ensure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide.

**Requirements:**
- Node.js >= 20
- npm or Yarn
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. **Clone the repository**
   ```sh
   git clone <repository-url>
   cd VibeCast
   ```

2. **Install dependencies**
   ```sh
   npm install
   # OR
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```sh
   # Install Ruby dependencies
   bundle install
   
   # Install CocoaPods dependencies
   cd ios
   bundle exec pod install
   cd ..
   ```

## Running the App

### Start Metro Bundler

```sh
npm start
# OR
yarn start
```

### Run on Android

```sh
npm run android
# OR
yarn android
```

### Run on iOS

```sh
npm run ios
# OR
yarn ios
```

## Project Structure

```
VibeCast/
├── api/              # API integration and services
├── components/       # Reusable UI components
├── contexts/         # React Context providers (FavoritesContext)
├── hooks/            # Custom React hooks
├── navigation/       # Navigation configuration
├── screens/          # App screens
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── FavouritesScreen.tsx
│   ├── PodcastScreen.tsx
│   └── AudioScreen.tsx
├── types/            # TypeScript type definitions
└── App.tsx           # Root component
```

## Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Development

### Hot Reload

The app supports Fast Refresh. Make changes to your code and see them reflected immediately.

To manually reload:
- **Android**: Press <kbd>R</kbd> twice or <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) / <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS) for Dev Menu
- **iOS**: Press <kbd>R</kbd> in the iOS Simulator

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `npm start -- --reset-cache`
2. **Build failures**: Clean build folders
   - Android: `cd android && ./gradlew clean`
   - iOS: `cd ios && xcodebuild clean`
3. **Pod installation issues**: 
   ```sh
   cd ios
   rm -rf Pods Podfile.lock
   bundle exec pod install
   ```

For more help, see the [React Native Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Learn More

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
