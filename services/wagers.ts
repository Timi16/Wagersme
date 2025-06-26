export interface Wager {
    id: number;
    title: string;
    description: string;
    category: 'sports' | 'politics' | 'entertainment' | 'crypto' | 'tech' | 'weather' | 'finance' | 'other';
    deadline: string;
    tags: string[];
    stakeType: 'fixed' | 'open';
    fixedStake?: number;
    minStake?: number;
    maxStake?: number;
    totalPool: number;
    participantCount: number;
    yesCount: number;
    noCount: number;
    yesPool?: number;
    noPool?: number;
    status: 'active' | 'closed' | 'resolved' | 'cancelled';
    result?: 'yes' | 'no' | 'cancelled';
    createdBy: number;
    resolvedAt?: string;
    createdAt: string;
    updatedAt: string;
    creator: {
      id: number;
      username: string;
    };
}
  
  export interface CreateWagerData {
    title: string;
    description: string;
    category: string;
    deadline: string;
    tags?: string[];
    stakeType?: 'fixed' | 'open';
    fixedStake?: number;
    minStake?: number;
    maxStake?: number;
  }
  
  export interface UpdateWagerData {
    title?: string;
    description?: string;
    tags?: string[];
  }
  
  export interface WagersResponse {
    wagers: Wager[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }
  
  export interface ResolveWagerData {
    result: 'yes' | 'no' | 'cancelled';
  }
  
  // services/wagers.ts
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  
  class WagersService {
    private getAuthHeaders(): HeadersInit {
      const token = localStorage.getItem('token');
      return {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      };
    }
  
    /**
     * Get all wagers with optional filters
     */
    async getWagers(params?: {
      category?: string;
      status?: string;
      page?: number;
      limit?: number;
    }): Promise<WagersResponse> {
      const searchParams = new URLSearchParams();
      if (params?.category) searchParams.append('category', params.category);
      if (params?.status) searchParams.append('status', params.status);
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
  
      const url = `${API_BASE_URL}/wagers?${searchParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch wagers: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    /**
     * Get wagers by category
     */
    async getWagersByCategory(
      category: string,
      params?: { page?: number; limit?: number }
    ): Promise<WagersResponse> {
      const searchParams = new URLSearchParams();
      if (params?.page) searchParams.append('page', params.page.toString());
      if (params?.limit) searchParams.append('limit', params.limit.toString());
  
      const url = `${API_BASE_URL}/wagers/category/${category}?${searchParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch wagers by category: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    /**
     * Get single wager by ID
     */
    async getWager(id: number): Promise<{ wager: Wager }> {
      const response = await fetch(`${API_BASE_URL}/wagers/${id}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch wager: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    /**
     * Create a new wager (requires authentication)
     */
    async createWager(data: CreateWagerData): Promise<{ message: string; wager: Wager }> {
      const response = await fetch(`${API_BASE_URL}/wagers`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to create wager: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    /**
     * Update a wager (requires authentication)
     */
    async updateWager(id: number, data: UpdateWagerData): Promise<{ message: string; wager: Wager }> {
      const response = await fetch(`${API_BASE_URL}/wagers/${id}`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to update wager: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    /**
     * Delete a wager (requires authentication)
     */
    async deleteWager(id: number): Promise<{ message: string }> {
      const response = await fetch(`${API_BASE_URL}/wagers/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to delete wager: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    /**
     * Place a bet on a wager (requires authentication)
     */
    async placeBet(wagerId: number, data: { choice: 'yes' | 'no'; stake: number }): Promise<{ message: string }> {
      const response = await fetch(`${API_BASE_URL}/wagers/${wagerId}/bet`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to place bet: ${response.statusText}`);
      }
  
      return response.json();
    }
  
    /**
     * Resolve a wager (requires admin authentication)
     */
    async resolveWager(id: number, data: ResolveWagerData): Promise<{ message: string }> {
      const response = await fetch(`${API_BASE_URL}/wagers/${id}/resolve`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to resolve wager: ${response.statusText}`);
      }
  
      return response.json();
    }
  }
  
  // Export a singleton instance
  export const wagersService = new WagersService();
  export default wagersService;