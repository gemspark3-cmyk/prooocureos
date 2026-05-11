import useSWR from 'swr';
import { procureos } from './api';

// Standard Fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

// ProcureOS SDK Fetcher (using our SDK methods)
const sdkFetcher = async (key: string) => {
  const [method, ...args] = JSON.parse(key);
  // Check if it's in auth or top level
  // @ts-ignore
  const fn = procureos.auth[method] || procureos[method];
  return await fn(...args);
};

/**
 * ⚡ System Health Hook
 */
export function useSystemHealth() {
  const { data, error } = useSWR(
    JSON.stringify(['getHealth']),
    sdkFetcher,
    { refreshInterval: 30000, revalidateOnFocus: true }
  );

  return {
    health: data,
    isOnline: !!data && !error,
    isLoading: !error && !data
  };
}

/**
 * 📦 Dashboard Data Hook
 */
export function useDashboardInit(page = 1, limit = 5, enabled = true) {
  const { data, error, mutate } = useSWR(
    enabled ? JSON.stringify(['getDashboardInit', page, limit]) : null,
    sdkFetcher,
    { 
      revalidateOnFocus: true, 
      refreshInterval: 30000, 
      dedupingInterval: 5000,
      keepPreviousData: true 
    }
  );

  return {
    dashboard: data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

/**
 * 📋 RFQ List Hook
 */
export function useRequests(page = 1, limit = 5, search = '', enabled = true) {
  const { data, error, mutate } = useSWR(
    enabled ? JSON.stringify(['listRequests', page, limit, search]) : null,
    sdkFetcher,
    { 
      revalidateOnFocus: true, 
      refreshInterval: 20000, 
      dedupingInterval: 5000,
      keepPreviousData: true 
    }
  );

  return {
    requests: data?.requests || [],
    total: data?.total || 0,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

/**
 * 📦 Purchase Order List Hook
 */
export function useOrders(page = 1, limit = 5, search = '', enabled = true) {
  const { data, error, mutate } = useSWR(
    enabled ? JSON.stringify(['listOrders', page, limit, search]) : null,
    sdkFetcher,
    { 
      revalidateOnFocus: true, 
      refreshInterval: 30000, 
      dedupingInterval: 5000,
      keepPreviousData: true 
    }
  );

  return {
    orders: data?.orders || [],
    total: data?.total || 0,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

/**
 * 🏢 Registered Suppliers Hook
 */
export function useRegisteredSuppliers(page = 1, limit = 10, enabled = true) {
  const { data, error, mutate } = useSWR(
    enabled ? JSON.stringify(['listRegisteredSuppliers', page, limit]) : null,
    sdkFetcher,
    { 
      revalidateOnFocus: false, 
      dedupingInterval: 10000,
      keepPreviousData: true 
    }
  );

  return {
    suppliers: data?.items || [],
    total: data?.total || 0,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

/**
 * 🏠 Warehouses Hook
 */
export function useWarehouses(enabled = true) {
  const { data, error, mutate } = useSWR(
    enabled ? JSON.stringify(['listWarehouses']) : null,
    sdkFetcher,
    { 
      revalidateOnFocus: false,
      dedupingInterval: 10000 
    }
  );

  return {
    warehouses: data?.warehouses || [],
    isLoading: !error && !data,
    isError: error,
    mutate
  };
}

/**
 * ?? Debounce Hook
 */
import { useState, useEffect } from 'react';
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}
