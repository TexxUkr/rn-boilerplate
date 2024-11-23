import { lastFmApiV2 } from '../api';
import { useState, useCallback } from 'react';

export const useGetTopAlbums = () => {
  const [data, setData] = useState<AlbumResponse[]>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetQuery = useCallback(() => {
    setData([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const useFetchOneQuery = useCallback(
    async (artistName: string) => {
      setIsLoading(true);
      try {
        const response = await lastFmApiV2.getTopAlbums(artistName);
        if (response.kind !== 'ok') {
          throw new Error(response.kind);
        }
        setData(response.data?.topalbums.album || []);
        setError(null);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [setData, setError, setIsLoading],
  );

  return {
    data,
    error,
    isLoading,
    resetQuery,
    useFetchOneQuery,
  };
};
