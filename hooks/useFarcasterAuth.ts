import React, { useState, useEffect } from 'react';
import { FarcasterUser } from '@/types/poker';

export function useFarcasterAuth() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if already connected (mock implementation)
    const savedUser = localStorage.getItem('farcaster_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsConnected(true);
    }
  }, []);

  const connect = async () => {
    try {
      // Mock Farcaster authentication
      // In production, this would use the actual Farcaster SDK
      const mockUser: FarcasterUser = {
        fid: Math.floor(Math.random() * 100000),
        username: 'pokerplayer',
        displayName: 'Poker Player',
        pfpUrl: 'https://via.placeholder.com/150'
      };

      setUser(mockUser);
      setIsConnected(true);
      localStorage.setItem('farcaster_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Failed to connect to Farcaster:', error);
    }
  };

  const disconnect = () => {
    setUser(null);
    setIsConnected(false);
    localStorage.removeItem('farcaster_user');
  };

  return {
    user,
    isConnected,
    connect,
    disconnect
  };
}