// hooks/useWagers.ts
import { useState, useEffect, useCallback } from 'react';
import wagersService, { Wager, WagersResponse, CreateWagerData, UpdateWagerData } from '../services/wagers';

interface UseWagersOptions {
  category?: string;
  status?: string;
  page?: number;
  limit?: number;
  autoFetch?: boolean;
}

export const useWagers = (options: UseWagersOptions = {}) => {
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  const { autoFetch = true, ...params } = options;

  const fetchWagers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response: WagersResponse = await wagersService.getWagers(params);
      setWagers(response.wagers);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wagers');
    } finally {
      setLoading(false);
    }
  }, [params.category, params.status, params.page, params.limit]);

  const createWager = async (data: CreateWagerData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await wagersService.createWager(data);
      // Refresh the list after creating
      await fetchWagers();
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create wager';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateWager = async (id: number, data: UpdateWagerData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await wagersService.updateWager(id, data);
      // Update the wager in the local state
      setWagers(prev => prev.map(w => w.id === id ? response.wager : w));
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update wager';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteWager = async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await wagersService.deleteWager(id);
      // Remove the wager from local state
      setWagers(prev => prev.filter(w => w.id !== id));
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete wager';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchWagers();
    }
  }, [fetchWagers, autoFetch]);

  return {
    wagers,
    loading,
    error,
    pagination,
    fetchWagers,
    createWager,
    updateWager,
    deleteWager,
    refetch: fetchWagers,
  };
};

// Hook for single wager
export const useWager = (id: number) => {
  const [wager, setWager] = useState<Wager | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWager = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await wagersService.getWager(id);
      setWager(response.wager);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wager');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const placeBet = async (choice: 'yes' | 'no', stake: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await wagersService.placeBet(id, { choice, stake });
      // Refresh the wager after placing bet
      await fetchWager();
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to place bet';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWager();
  }, [fetchWager]);

  return {
    wager,
    loading,
    error,
    fetchWager,
    placeBet,
    refetch: fetchWager,
  };
};

// Hook for wagers by category
export const useWagersByCategory = (category: string, options: { page?: number; limit?: number } = {}) => {
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  });

  const fetchWagersByCategory = useCallback(async () => {
    if (!category) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await wagersService.getWagersByCategory(category, options);
      setWagers(response.wagers);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wagers by category');
    } finally {
      setLoading(false);
    }
  }, [category, options.page, options.limit]);

  useEffect(() => {
    fetchWagersByCategory();
  }, [fetchWagersByCategory]);

  return {
    wagers,
    loading,
    error,
    pagination,
    fetchWagersByCategory,
    refetch: fetchWagersByCategory,
  };
};