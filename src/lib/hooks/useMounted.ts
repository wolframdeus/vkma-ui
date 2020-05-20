import {useEffect, useRef} from 'react';

/**
 * Detects if mount was already done
 */
export function useMounted(): boolean {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
    }
  }, []);

  return mountedRef.current;
}
