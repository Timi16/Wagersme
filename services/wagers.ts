import authService from './auth';

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
    totalYesStake: number;
    totalNoStake: number;
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
    multiplierYes?: number;
    multiplierNo?: number;
    predictedWinnings?: number;
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class WagersService {
    private getAuthHeaders(): HeadersInit {
        const token = authService.getToken();
        console.log('🔑 Auth token:', token ? 'Present' : 'Missing');
        
        return {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        };
    }

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
        
        console.log('📡 Fetching wagers from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        });

        console.log('📡 Wagers response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Failed to fetch wagers:', errorText);
            throw new Error(`Failed to fetch wagers: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Wagers fetched successfully:', data);
        return data;
    }

    async getWagersByCategory(
        category: string,
        params?: { page?: number; limit?: number }
    ): Promise<WagersResponse> {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.append('page', params.page.toString());
        if (params?.limit) searchParams.append('limit', params.limit.toString());

        const url = `${API_BASE_URL}/wagers/category/${category}?${searchParams.toString()}`;
        
        console.log('📡 Fetching wagers by category from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        });

        console.log('📡 Category wagers response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Failed to fetch wagers by category:', errorText);
            throw new Error(`Failed to fetch wagers by category: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Category wagers fetched successfully:', data);
        return data;
    }

    async getWager(id: number): Promise<{ wager: Wager }> {
        const url = `${API_BASE_URL}/wagers/${id}`;
        console.log('📡 Fetching single wager from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: this.getAuthHeaders(),
        });

        console.log('📡 Single wager response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Failed to fetch wager:', errorText);
            throw new Error(`Failed to fetch wager: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('✅ Single wager fetched successfully:', data);
        return data;
    }

    async createWager(data: CreateWagerData): Promise<{ message: string; wager: Wager }> {
        const url = `${API_BASE_URL}/wagers`;
        console.log('📡 Creating wager at:', url);
        console.log('📡 Create wager data:', data);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        console.log('📡 Create wager response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Failed to create wager:', errorText);
            let error;
            try {
                error = JSON.parse(errorText);
            } catch {
                throw new Error(`Failed to create wager: ${response.statusText}`);
            }
            throw new Error(error.message || `Failed to create wager: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('✅ Wager created successfully:', responseData);
        return responseData;
    }

    async updateWager(id: number, data: UpdateWagerData): Promise<{ message: string; wager: Wager }> {
        const url = `${API_BASE_URL}/wagers/${id}`;
        console.log('📡 Updating wager at:', url);
        console.log('📡 Update wager data:', data);
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        console.log('📡 Update wager response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Failed to update wager:', errorText);
            let error;
            try {
                error = JSON.parse(errorText);
            } catch {
                throw new Error(`Failed to update wager: ${response.statusText}`);
            }
            throw new Error(error.message || `Failed to update wager: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('✅ Wager updated successfully:', responseData);
        return responseData;
    }

    async deleteWager(id: number): Promise<{ message: string }> {
        const url = `${API_BASE_URL}/wagers/${id}`;
        console.log('📡 Deleting wager at:', url);
        
        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.getAuthHeaders(),
        });

        console.log('📡 Delete wager response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Failed to delete wager:', errorText);
            let error;
            try {
                error = JSON.parse(errorText);
            } catch {
                throw new Error(`Failed to delete wager: ${response.statusText}`);
            }
            throw new Error(error.message || `Failed to delete wager: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('✅ Wager deleted successfully:', responseData);
        return responseData;
    }

    async placeBet(wagerId: number, data: { choice: 'yes' | 'no'; stake: number }): Promise<{ message: string }> {
        const url = `${API_BASE_URL}/wagers/${wagerId}/bet`;
        
        console.log('🎯 PLACING BET - Details:');
        console.log('   URL:', url);
        console.log('   Wager ID:', wagerId);
        console.log('   Bet Data:', JSON.stringify(data, null, 2));
        console.log('   Headers:', this.getAuthHeaders());
        
        const response = await fetch(url, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        console.log('🎯 PLACE BET Response Status:', response.status);
        console.log('🎯 PLACE BET Response Headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('🎯 PLACE BET Raw Response:', responseText);

        if (!response.ok) {
            console.error('❌ PLACE BET FAILED:', responseText);
            let error;
            try {
                error = JSON.parse(responseText);
            } catch (parseError) {
                console.error('❌ Failed to parse error response:', parseError);
                throw new Error(`Failed to place bet: ${response.status} ${response.statusText}`);
            }
            throw new Error(error.message || `Failed to place bet: ${response.statusText}`);
        }

        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (parseError) {
            console.error('❌ Failed to parse success response:', parseError);
            throw new Error('Invalid response format from server');
        }

        console.log('✅ BET PLACED SUCCESSFULLY:', responseData);
        return responseData;
    }

    async resolveWager(id: number, data: ResolveWagerData): Promise<{ message: string }> {
        const url = `${API_BASE_URL}/wagers/${id}/resolve`;
        console.log('📡 Resolving wager at:', url);
        console.log('📡 Resolve wager data:', data);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: this.getAuthHeaders(),
            body: JSON.stringify(data),
        });

        console.log('📡 Resolve wager response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Failed to resolve wager:', errorText);
            let error;
            try {
                error = JSON.parse(errorText);
            } catch {
                throw new Error(`Failed to resolve wager: ${response.statusText}`);
            }
            throw new Error(error.message || `Failed to resolve wager: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log('✅ Wager resolved successfully:', responseData);
        return responseData;
    }
}

export const wagersService = new WagersService();
export default wagersService;