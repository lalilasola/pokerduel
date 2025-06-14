import { useState, useEffect } from 'react';
import { FarcasterUser } from '@/types/poker';

// Mock Farcaster auth implementation
// In a real app, this would integrate with viem + wagmi and Farcaster SDK
export function useFarcasterAuth() {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user was previously connected
    const savedUser = localStorage.getItem('farcaster_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsConnected(true);
    }
  }, []);

  const connect = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, this would use Farcaster SDK and viem/wagmi
      // For now, we'll simulate the auth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: FarcasterUser = {
        fid: Math.floor(Math.random() * 100000),
        username: 'alice',
        displayName: 'Alice',
        pfpUrl: undefined
      };
      
      setUser(mockUser);
      setIsConnected(true);
      localStorage.setItem('farcaster_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Failed to connect:', error);
    } finally {
      setIsLoading(false);
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
    isLoading,
    connect,
    disconnect
  };
}
