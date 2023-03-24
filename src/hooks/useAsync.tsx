import { useEffect, useState } from 'react';

export function useAsync(handler:any, immediate = true) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const act = async(...args:any) => {
    setLoading(true);
    setError(null);

    try {
      const data = await handler(...args);
      setData(data);
      setLoading(false);
      return data;
    } catch (err:any) {
      setError(error);
      setLoading(false);
      return {error:true, status:err?.response?.request?.status};
    }
  };

  useEffect(() => {
    if (immediate) {
      act();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    loading,
    error,
    act
  };

}
