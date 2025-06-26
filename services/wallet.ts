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
  private fetchProfilePromise: Promise<WalletData> | null = null; // Prevent multiple concurrent calls

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
    this.walletState = {
      walletData: null,
      transactions: [], // Fixed: Initialize as empty array instead of undefined
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
    // Prevent multiple concurrent calls
    if (this.fetchProfilePromise) {
      return this.fetchProfilePromise;
    }

    this.updateWalletState({ isLoading: true, error: null });

    this.fetchProfilePromise = this._fetchProfile();
    
    try {
      const result = await this.fetchProfilePromise;
      return result;
    } finally {
      this.fetchProfilePromise = null; // Clear the promise when done
    }
  }

  private async _fetchProfile(): Promise<WalletData> {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching user profile...');
      const response = await fetch(`${this.baseUrl}/auth/profile`, {
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
      const response = await fetch(`${this.baseUrl}/auth/balance`, {
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
      transactions: [], // Fixed: Reset to empty array instead of undefined
      isLoading: false,
      error: null,
    });
  }

  /**
   * Fetch transactions from backend
   */
  async fetchTransactions(): Promise<Transaction[]> {
    // Don't set loading state if we're already loading profile
    if (!this.fetchProfilePromise) {
      this.updateWalletState({ isLoading: true, error: null });
    }

    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Fetching transactions...');
      const response = await fetch(`${this.baseUrl}/wallet/transactions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Transactions response:', data);

      if (!response.ok) {
        // If endpoint doesn't exist, return empty array instead of throwing error
        if (response.status === 404) {
          console.log('Transactions endpoint not found, using empty array');
          const emptyTransactions: Transaction[] = [];
          this.updateWalletState({
            transactions: emptyTransactions,
            isLoading: false,
            error: null,
          });
          return emptyTransactions;
        }
        throw new Error(data.message || 'Failed to fetch transactions');
      }

      const transactions: Transaction[] = data.transactions || [];
      this.updateWalletState({
        transactions,
        isLoading: false,
        error: null,
      });

      return transactions;
    } catch (error) {
      console.error('Fetch transactions error:', error);
      // Don't fail completely if transactions can't be fetched
      const emptyTransactions: Transaction[] = [];
      this.updateWalletState({
        transactions: emptyTransactions,
        isLoading: false,
        error: null, // Don't set error for missing transactions endpoint
      });
      return emptyTransactions;
    }
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

// Custom hook for React components with memoized functions
export const useWallet = () => {
  const [walletState, setWalletState] = React.useState<WalletState>(walletService.getWalletState());

  React.useEffect(() => {
    const unsubscribe = walletService.subscribe(setWalletState);
    return unsubscribe;
  }, []);

  // Memoize the functions to prevent unnecessary re-renders
  const memoizedFunctions = React.useMemo(() => ({
    fetchProfile: () => walletService.fetchProfile(),
    fetchBalance: () => walletService.fetchBalance(),
    fetchTransactions: () => walletService.fetchTransactions(),
    refreshWalletData: () => walletService.refreshWalletData(),
    simulateDeposit: (amount: number) => walletService.simulateDeposit(amount),
    simulateWithdrawal: (amount: number) => walletService.simulateWithdrawal(amount),
  }), []);

  return {
    walletData: walletState.walletData,
    transactions: walletState.transactions,
    isLoading: walletState.isLoading,
    error: walletState.error,
    ...memoizedFunctions,
  };
};

// Export types and service
export type { VirtualAccount, WalletData, Transaction, WalletState };
export { WalletService };
export default walletService;