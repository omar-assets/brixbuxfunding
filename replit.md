# Replit.md

## Overview

This is a full-stack web application built with React frontend and Express backend, featuring a landing page for a financial services company. The application uses PostgreSQL with Drizzle ORM for data persistence and includes a comprehensive UI component library based on shadcn/ui with Tailwind CSS styling.

## User Preferences

Preferred communication style: Simple, everyday language.

### Design Transformation (January 12, 2025)
The website styling has been transformed from a tech/SaaS aesthetic to a professional, high-capital funding firm design:
- Typography: Changed from tech-focused fonts to professional serif (Georgia/Playfair Display) for headings and Inter for body text
- Colors: Moved from purple gradients to minimal palette with primary purple #5A00E0 used sparingly
- Animations: Removed playful floating shapes, animated gradients, and excessive transitions
- Layout: Cleaner, more authoritative design with increased spacing and reduced visual noise
- Components: All buttons, cards, and forms now use professional styling with subtle borders instead of gradients

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: React hooks and TanStack React Query for server state

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: connect-pg-simple for PostgreSQL session storage

### Development Architecture
- **Monorepo Structure**: Client, server, and shared code in separate directories
- **Type Safety**: Shared TypeScript types and schema definitions
- **Hot Reloading**: Vite middleware integration with Express for development

## Key Components

### Directory Structure
```
├── client/          # React frontend application
│   ├── src/         # Source code
│   └── index.html   # HTML template
├── server/          # Express backend application
│   ├── index.ts     # Main server file
│   ├── routes.ts    # API route definitions
│   ├── storage.ts   # Data access layer
│   └── vite.ts      # Vite middleware setup
├── shared/          # Shared TypeScript definitions
│   └── schema.ts    # Database schema and types
└── migrations/      # Database migration files
```

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Validation**: Zod schemas for type-safe data validation
- **ORM**: Drizzle ORM with PostgreSQL dialect

### Storage Layer
- **Interface**: IStorage interface for CRUD operations
- **Implementation**: MemStorage class for in-memory development storage
- **Extensibility**: Designed to be easily replaced with database-backed storage

## Data Flow

1. **Frontend**: React components make API calls using fetch or React Query
2. **Backend**: Express routes handle API requests and interact with storage layer
3. **Database**: Drizzle ORM manages database operations with type safety
4. **Validation**: Zod schemas ensure data integrity at the API boundary

## External Dependencies

### Frontend Dependencies
- **UI Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom configuration
- **Icons**: Lucide React for iconography
- **Forms**: React Hook Form with Zod resolvers
- **Animations**: Custom CSS animations and transitions

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Session**: connect-pg-simple for session management
- **Development**: tsx for TypeScript execution

### Build Tools
- **Bundler**: Vite for frontend, esbuild for backend
- **TypeScript**: Strict type checking across the stack
- **PostCSS**: For CSS processing with Tailwind

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express middleware
- **Hot Reloading**: Full-stack hot reload support
- **Error Handling**: Runtime error overlay for development

### Production Build
- **Frontend**: Vite builds optimized static assets
- **Backend**: esbuild bundles server code to single file
- **Static Serving**: Express serves built frontend assets

### Environment Configuration
- **Database**: Requires DATABASE_URL environment variable
- **Build Scripts**: Separate dev, build, and start commands
- **Type Checking**: Dedicated check script for TypeScript validation

### Database Management
- **Migrations**: Drizzle Kit for schema migrations
- **Push Command**: Direct schema push for development
- **Configuration**: Centralized database config in drizzle.config.ts

## Notable Architectural Decisions

### Monorepo Structure
- **Problem**: Code sharing between frontend and backend
- **Solution**: Shared directory with TypeScript path mapping
- **Benefits**: Type safety across stack, reduced duplication

### Storage Abstraction
- **Problem**: Flexible data persistence layer
- **Solution**: IStorage interface with pluggable implementations
- **Benefits**: Easy testing, database flexibility, clean architecture

### Vite Integration
- **Problem**: Development experience with full-stack TypeScript
- **Solution**: Vite middleware integration with Express
- **Benefits**: Fast hot reload, modern tooling, optimized builds

### Component Library Choice
- **Problem**: Consistent, accessible UI components
- **Solution**: shadcn/ui with Radix UI primitives
- **Benefits**: Customizable, accessible, modern design system