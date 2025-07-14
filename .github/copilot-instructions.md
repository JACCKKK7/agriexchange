<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# AgriXchange Project Instructions

## Project Overview
AgriXchange is a comprehensive web application that connects farmers directly with consumers and retailers, eliminating middlemen and ensuring fair prices. The platform includes features for product listing (retail and wholesale), live bidding with WebSocket integration, weather information, farming news, and delivery partner management.

## Architecture
- **Frontend**: React 18 with TypeScript, Vite build tool
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API for authentication and cart
- **Routing**: React Router v6
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Real-time Features**: Socket.IO for live bidding

## User Roles
1. **Farmers**: Can list products for retail/wholesale, participate in bidding, access weather/news
2. **Traders**: Can participate in wholesale bidding, view bidding history
3. **Users/Consumers**: Can browse and purchase retail products, manage cart

## Key Features
- Role-based authentication and dashboards
- Product listing with image upload and quality certificates
- Live bidding system with real-time updates
- Shopping cart and order management
- Weather integration for farmers
- News feed for agricultural updates
- Delivery partner selection
- Mobile-responsive design

## Code Standards
- Use TypeScript for all components and utilities
- Implement proper error boundaries and loading states
- Follow React best practices (hooks, functional components)
- Use custom UI components from `src/components/ui`
- Implement proper form validation with Zod schemas
- Use proper TypeScript types from `src/types`
- Follow the established folder structure
- Use Tailwind CSS classes and custom utility classes
- Implement proper accessibility features

## Naming Conventions
- Components: PascalCase (e.g., `ProductCard.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Folders: camelCase (e.g., `components/ui`)
- CSS classes: Tailwind utility classes and custom classes

## Development Guidelines
- Always use proper TypeScript types
- Implement loading and error states for async operations
- Use the established context providers for state management
- Follow the component composition pattern
- Implement proper form validation and error handling
- Use semantic HTML elements
- Ensure mobile responsiveness
- Add proper comments for complex logic

## File Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── layout/       # Layout components (Header, Footer, Layout)
│   └── forms/        # Form components
├── pages/            # Page components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── services/         # API services and utilities
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Environment Considerations
- This is a demo application with mock data
- Authentication is simulated (no real backend validation)
- Use placeholder images from Unsplash for product images
- Implement responsive design for mobile and desktop
- Consider performance optimization for large product lists
