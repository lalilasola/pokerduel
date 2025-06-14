# Poker Duel - Replit Application Guide

## Overview

Poker Duel is a 1v1 Texas Hold'em poker game designed as a Farcaster mini-app. The application allows users to connect with their Farcaster accounts and play real-time poker games against opponents. The project is built with a modern tech stack including React, TypeScript, Express, and PostgreSQL with Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React hooks with custom game state management
- **UI Library**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom poker-themed design tokens
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API structure (to be implemented)

### Development Environment
- **Platform**: Replit with Node.js 20 runtime
- **Database**: PostgreSQL 16 module
- **Development Server**: Concurrent frontend (Vite) and backend (Express) servers
- **Hot Reload**: Vite HMR for frontend, tsx for backend development

## Key Components

### Game Logic
- **Card Management**: Deck creation, shuffling, and dealing system
- **Hand Evaluation**: Poker hand ranking and comparison logic
- **Game State**: Phase management (preflop, flop, turn, river, showdown)
- **Player Actions**: Call, fold, and betting mechanics

### Authentication
- **Farcaster Integration**: Mock implementation ready for real Farcaster SDK integration
- **User Management**: Local storage for development, database integration planned

### UI Components
- **GameTable**: Main poker table interface
- **PlayerSection**: Individual player cards and status
- **CommunityCards**: Shared cards display with game phase indicators
- **GameActions**: Player action buttons (call, fold)
- **WinnerModal**: End-game results display
- **StatsPanel**: Player statistics tracking

### Database Schema
- **Users Table**: Basic user authentication structure
- **Extensible Design**: Ready for game history, player stats, and match data

## Data Flow

1. **Game Initialization**: 
   - Create deck and shuffle cards
   - Deal hole cards to players
   - Set initial game state and blinds

2. **Game Progression**:
   - Player actions update game state
   - Community cards revealed based on phase
   - Hand evaluation occurs at showdown

3. **State Persistence**:
   - Player statistics stored in localStorage (development)
   - Game results update player win/loss records
   - Database integration ready for production

4. **Real-time Updates**:
   - Game state changes trigger UI re-renders
   - Player actions immediately reflected in interface

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection (Neon database ready)
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/react-***: Accessible UI primitives

### Development Tools
- **Vite**: Frontend build tool with HMR
- **tsx**: TypeScript execution for backend
- **tailwindcss**: Utility-first CSS framework
- **postcss**: CSS processing

### Future Integrations
- **Farcaster SDK**: For real authentication and social features
- **viem/wagmi**: Web3 wallet connections
- **WebSocket**: Real-time multiplayer functionality

## Deployment Strategy

### Development
- **Local Development**: `npm run dev` starts both frontend and backend servers
- **Port Configuration**: Frontend on Vite's default, backend serves API endpoints
- **Database**: PostgreSQL connection via environment variables

### Production
- **Build Process**: `npm run build` creates production bundles
- **Frontend**: Static files served from Express backend
- **Backend**: Node.js server with built Express application
- **Database**: PostgreSQL connection string required

### Replit Deployment
- **Auto-deployment**: Configured for Replit's autoscale deployment
- **Environment**: Node.js 20 with PostgreSQL 16 module
- **Port Binding**: Application listens on environment-specified port

## Changelog
```
Changelog:
- June 14, 2025. Initial setup
- June 14, 2025. Converting to Next.js structure for Vercel deployment
```

## User Preferences
```
Preferred communication style: Simple, everyday language.
```