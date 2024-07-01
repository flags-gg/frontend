import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import {flagsAPIConfig} from "@/app.config.tsx";

interface CacheEntry {
  data: Blob;
  hash: string;
  timestamp: number;
  maxCacheDuration: number;
}

function useAuthFetch() {
  const auth = useAuth();
  const [cache, setCache] = useState<Record<string, CacheEntry>>({});

  const authFetch = async (apiPath: string, options: RequestInit = {}) => {
    if (!auth.isAuthenticated) {
      throw new Error('No user profile found. User must be logged in.');
    }

    const cacheKey: string = `${apiPath}_${JSON.stringify(options)}`;
    const currentTime = new Date().getTime();
    const cacheEntry = cache[cacheKey];

    const hashFunction = async(blob: Blob) => {
      const buffer = await blob.arrayBuffer();
      const digest = await crypto.subtle.digest('SHA-256', buffer);
      return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('');
    }

    if (cacheEntry && (currentTime - cacheEntry.timestamp < 30000)) {
      return new Response(cacheEntry.data);
    }

    const url = `${flagsAPIConfig.URL}${apiPath}`;
    const response = await fetch(url, {
      ...options,
      headers: setupHeaders(auth, options.headers),
    });

    const data = await response.clone().blob();
    const newHash = await hashFunction(data);
    if (cacheEntry && newHash === cacheEntry.hash) {
      const newMaxDuration = Math.max(cacheEntry.maxCacheDuration + 30000, 300000);
      updateCache(cacheKey, data, newHash, currentTime, newMaxDuration);
    } else {
      updateCache(cacheKey, data, newHash, currentTime, 30000);
    }

    return response;
  };

  const setupHeaders = (auth: ReturnType<typeof useAuth>, headersInit?: HeadersInit) => {
    const headers = new Headers(headersInit);
    headers.set('x-user-subject', auth.user?.profile?.sub || "");
    headers.set('x-user-access-token', auth.user?.access_token || "");
    return headers;
  }

  const updateCache = (cacheKey: string, data: Blob, hash: string, timestamp: number, maxCacheDuration: number) => {
    setCache(prevCache => ({
      ...prevCache,
      [cacheKey]: {
        data,
        hash,
        timestamp,
        maxCacheDuration
      }
    }))
  }

  // Effect to clear the cache periodically or based on some condition
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newCache: Record<string, CacheEntry> = {};
      Object.keys(cache).forEach(key => {
        if (now - cache[key].timestamp < 30000) { // keep valid entries
          newCache[key] = cache[key];
        }
      });
      setCache(newCache);
    }, 30000); // clear expired cache every 30 seconds

    return () => clearInterval(interval);
  }, [cache]);

  return authFetch;
}

export default useAuthFetch;
