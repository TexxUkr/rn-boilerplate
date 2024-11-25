import { lastFmApiV2 } from '../api';
import { useState, useCallback } from 'react';

export const useGetAlbumInfo = () => {
  const [data, setData] = useState<AlbumInfo | undefined>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetQuery = useCallback(() => {
    setData(undefined);
    setError(undefined);
    setIsLoading(false);
  }, []);

  const useFetchOneQuery = useCallback(
    async (mbid: string) => {
      setIsLoading(true);
      try {
        const response = await lastFmApiV2.getAlbumInfo(mbid);
        if (response.kind !== 'ok') {
          throw new Error(response.kind);
        }
        setData(response.data);
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
