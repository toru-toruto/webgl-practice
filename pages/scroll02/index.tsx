import { NextPage } from 'next';
import { useRef, useMemo } from 'react';
import useOffsetTop from '../../src/libs/hooks/useOffsetTop';

const maxIconSize = 100;
const minIconSize = 20;

const HeaderScroll: NextPage = () => {
  const iconRef = useRef(null);
  const { pageOffsetTop, viewportTop } = useOffsetTop(iconRef);
  const iconSize = useMemo(() => {
    if (pageOffsetTop === undefined || viewportTop === undefined)
      return maxIconSize;

    const size =
      minIconSize + (viewportTop / pageOffsetTop) * (maxIconSize - minIconSize);
    return size.toFixed(1);
  }, [pageOffsetTop, viewportTop]);

  return (
    <div className='h-[200vh] w-full'>
        <div className='h-40'></div>
      <div
        ref={iconRef}
        style={{ width: `${iconSize}px`, height: `${iconSize}px`, backgroundColor: '#ff0000' }}
      />
    </div>
  );
};
export default HeaderScroll;
