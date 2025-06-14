# Poker Duel - Farcaster Mini App

A 1v1 Texas Hold'em poker game built as a Farcaster Mini App using Next.js.

## Features

- ✅ Complete Texas Hold'em poker game logic
- ✅ Farcaster authentication (mock implementation ready for real integration)
- ✅ Interactive game table with player sections and community cards
- ✅ Game actions (Call/Fold) with proper betting mechanics
- ✅ Winner determination and statistics tracking
- ✅ Responsive design with poker-themed styling
- ✅ Local storage for game state persistence
- ✅ Farcaster configuration files for mini app deployment

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom poker themes
- **Language**: TypeScript
- **Deployment**: Vercel
- **Game Logic**: Custom poker hand evaluation system

## Deployment

This project is configured for deployment on Vercel. The main files are:

- `app/page.tsx` - Main poker game interface
- `app/layout.tsx` - App layout with metadata
- `components/` - Reusable game components
- `hooks/` - Custom React hooks for game logic
- `lib/` - Utility functions for cards and poker logic
- `types/` - TypeScript type definitions
- `public/.well-known/farcaster.json` - Farcaster mini app configuration

## Getting Started

1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Game Flow

1. Connect with Farcaster account (mock implementation)
2. Start a new game
3. View your hole cards and make decisions
4. Progress through poker phases (preflop, flop, turn, river)
5. View winner determination and update statistics

## Farcaster Integration

The app includes proper Farcaster mini app configuration files and is ready for integration with real Farcaster authentication using viem + wagmi when deployed.