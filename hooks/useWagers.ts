import { useState, useEffect, useCallback, useRef } from 'react';
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

export const useWager = (id: number) => {
  const [wager, setWager] = useState<Wager | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchWager = useCallback(async () => {
    // Don't fetch if id is invalid
    if (!id || id <= 0) {
      setWager(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await wagersService.getWager(id);
      setWager(response.wager);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch wager');
      setWager(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const placeBet = async (choice: 'yes' | 'no', stake: number) => {
    if (!id || id <= 0) {
      throw new Error('Invalid wager ID');
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await wagersService.placeBet(id, { choice, stake });
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
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Only start fetching if we have a valid ID
    if (id && id > 0) {
      fetchWager();
      
      // Set up polling with cleanup
      intervalRef.current = setInterval(() => {
        fetchWager();
      }, 10000); // Poll every 10 seconds instead of 5 to reduce load
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
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