# QuizApp Development Guide

## Build Commands
- `npm run ts:check` - TypeScript type checking
- `npm run start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run in web browser
- `node server/index.js` - Start Express backend server

## Code Style Guidelines
- **Component Structure**: Functional components with TypeScript interfaces
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Imports**: Group by source (React/RN first, then components, then types)
- **Types**: Use explicit typing for all props, parameters, and return values
- **State Management**: React hooks (useState, useEffect) for local state
- **Styling**: StyleSheet.create() at the bottom of component files
- **Error Handling**: Try/catch blocks with appropriate error responses
- **File Organization**: 
  - Components in src/components with index.ts exports
  - Screens in src/screens with component subdirectories
  - Shared types in dedicated types.ts files
  - Data in src/data directory

## Architecture
- React Native (Expo) frontend with TypeScript
- Express.js backend with MongoDB/Mongoose
- React Navigation for routing