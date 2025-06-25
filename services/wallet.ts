import React from 'react';

// Types
interface VirtualAccount {
  accountNumber: string;
  bankName: string;
  accountName: string;
}

interface WalletData {
  balance: number;
  pendingWinnings: number;
  virtualAccount: VirtualAccount;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'bet' | 'win' | 'loss';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  method?: string;
  wager?: string;
}

interface WalletState {
  walletData: WalletData | null;
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

// Configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Helper function to safely access localStorage
const getLocalStorage = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage;
  }
  return null;
};

// Get auth token
const getAuthToken = () => {
  const localStorage = getLocalStorage();
  return localStorage?.getItem('auth_token');
};

// Wallet service class
class WalletService {
  private baseUrl: string;
  private walletState: WalletState;
  private listeners: Set<(state: WalletState) => void>;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
    this.walletState = {
      walletData: null,
      transactions: [],
      isLoading: false,
      error: null,
    };
    this.listeners = new Set();
  }

  /**
   * Update wallet state and notify listeners
   */
  private updateWalletState(newState: Partial<WalletState>) {
    this.walletState = { ...this.walletState, ...newState };
    console.log('Wallet state updated:', this.walletState);
    this.listeners.forEach(listener => listener(this.walletState));
  }

  /**
   * Subscribe to wallet state changes
   */
  subscribe(listener: (state: WalletState) => void) {
    this.listeners.add(listener);
    listener(this.walletState);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Get current wallet state
   */
  getWalletState(): WalletState {
    return { ...this.walletState };
  }

  /**
   * Fetch user profile data (includes balance and virtual account)
   */
  async fetchProfile(): Promise<WalletData> {
    this.updateWalletState({ isLoading: true, error: null });

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching user profile...');
      const response = await fetch(`${this.baseUrl}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Profile response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch profile');
      }

      const walletData: WalletData = {
        balance: data.balance || 0,
        pendingWinnings: 0, // You can add this to your backend later
        virtualAccount: {
          accountNumber: data.virtualAccount?.accountNumber || '',
          bankName: data.virtualAccount?.bankName || '',
          accountName: data.virtualAccount?.accountName || '',
        },
      };

      this.updateWalletState({
        walletData,
        isLoading: false,
        error: null,
      });

      return walletData;
    } catch (error) {
      console.error('Fetch profile error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch wallet data';
      this.updateWalletState({
        isLoading: false,
        error: errorMessage,
      });
      throw error;
    }
  }

  /**
   * Fetch user balance only
   */
  async fetchBalance(): Promise<number> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching user balance...');
      const response = await fetch(`${this.baseUrl}/api/auth/balance`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Balance response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch balance');
      }

      // Update the balance in current wallet data
      if (this.walletState.walletData) {
        this.updateWalletState({
          walletData: {
            ...this.walletState.walletData,
            balance: data.balance,
          },
        });
      }

      return data.balance;
    } catch (error) {
      console.error('Fetch balance error:', error);
      throw error;
    }
  }

  /**
   * Store virtual account data (called after signup)
   */
  storeVirtualAccountData(accountData: {
    accountNumber: string;
    bankName: string;
    accountName?: string;
  }) {
    const virtualAccount: VirtualAccount = {
      accountNumber: accountData.accountNumber,
      bankName: accountData.bankName,
      accountName: accountData.accountName || '',
    };

    // Update current wallet state if it exists
    if (this.walletState.walletData) {
      this.updateWalletState({
        walletData: {
          ...this.walletState.walletData,
          virtualAccount,
        },
      });
    } else {
      // Create new wallet data with virtual account
      this.updateWalletState({
        walletData: {
          balance: 0,
          pendingWinnings: 0,
          virtualAccount,
        },
      });
    }

    console.log('Virtual account data stored:', virtualAccount);
  }

  /**
   * Refresh wallet data
   */
  async refreshWalletData() {
    try {
      await this.fetchProfile();
    } catch (error) {
      console.error('Failed to refresh wallet data:', error);
    }
  }

  /**
   * Clear wallet data (on logout)
   */
  clearWalletData() {
    this.updateWalletState({
      walletData: null,
      transactions: [],
      isLoading: false,
      error: null,
    });
  }

  /**
   * Simulate deposit (you can replace with real API call)
   */
  async simulateDeposit(amount: number): Promise<boolean> {
    this.updateWalletState({ isLoading: true });

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update balance
      if (this.walletState.walletData) {
        const updatedWalletData = {
          ...this.walletState.walletData,
          balance: this.walletState.walletData.balance + amount,
        };

        this.updateWalletState({
          walletData: updatedWalletData,
          isLoading: false,
        });
      }

      return true;
    } catch (error) {
      this.updateWalletState({ isLoading: false });
      throw error;
    }
  }

  /**
   * Simulate withdrawal (you can replace with real API call)
   */
  async simulateWithdrawal(amount: number): Promise<boolean> {
    this.updateWalletState({ isLoading: true });

    try {
      // Check if sufficient balance
      if (!this.walletState.walletData || this.walletState.walletData.balance < amount) {
        throw new Error('Insufficient balance');
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update balance
      const updatedWalletData = {
        ...this.walletState.walletData,
        balance: this.walletState.walletData.balance - amount,
      };

      this.updateWalletState({
        walletData: updatedWalletData,
        isLoading: false,
      });

      return true;
    } catch (error) {
      this.updateWalletState({ isLoading: false });
      throw error;
    }
  }
}

// Create singleton instance
const walletService = new WalletService();

// Custom hook for React components
export const useWallet = () => {
  const [walletState, setWalletState] = React.useState<WalletState>(walletService.getWalletState());

  React.useEffect(() => {
    const unsubscribe = walletService.subscribe(setWalletState);
    return unsubscribe;
  }, []);

  return {
    walletData: walletState.walletData,
    transactions: walletState.transactions,
    isLoading: walletState.isLoading,
    error: walletState.error,
    fetchProfile: walletService.fetchProfile.bind(walletService),
    fetchBalance: walletService.fetchBalance.bind(walletService),
    refreshWalletData: walletService.refreshWalletData.bind(walletService),
    simulateDeposit: walletService.simulateDeposit.bind(walletService),
    simulateWithdrawal: walletService.simulateWithdrawal.bind(walletService),
  };
};

// Export types and service
export type { VirtualAccount, WalletData, Transaction, WalletState };
export { WalletService };
export default walletService;