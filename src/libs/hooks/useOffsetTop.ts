import { RefObject, useEffect, useState } from 'react';
import useThrottle from './useThrottle';

function useOffsetTop(ref?: RefObject<HTMLElement>) {
  const [viewportTop, setViewportTop] = useState<number | undefined>(undefined);
  const [pageOffsetTop, setPageOffsetTop] = useState<number | undefined>(
    undefined
  );

  const handler = useThrottle(() => {
    if (!ref?.current) return;

    const clientRect = ref.current.getBoundingClientRect();
    setViewportTop(clientRect.top);
    const newPageOffsetTop = clientRect.top + window.pageYOffset;
    setPageOffsetTop(newPageOffsetTop);
  }, 10);

  useEffect(() => {
    if (!ref?.current) return;

    handler();
    window.addEventListener('scroll', handler);

    return () => window.removeEventListener('scroll', handler);
  }, [handler]);

  return { viewportTop, pageOffsetTop };
}
export default useOffsetTop