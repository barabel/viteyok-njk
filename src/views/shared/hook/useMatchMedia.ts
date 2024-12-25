import { useState, useLayoutEffect } from 'react';
import { MediaSizes } from '../enums';

interface mediaQueriesProps {
  isDesktop: MediaQueryList
  isTablet: MediaQueryList
  isMobile: MediaQueryList
}

interface mediaQueriesPropsReturn {
  isDesktop: boolean
  isTablet: boolean
  isMobile: boolean
}

let windowInit: Window;

if (typeof window !== 'undefined') {
  windowInit = window
}

/**
 * Хук определяет размер экрана, и возвращает объект со свойствами, равные true или false на определенный размер.
 */
const useMatchMedia = (): mediaQueriesPropsReturn => {
  const mediaQueries: mediaQueriesProps = {
    isDesktop: windowInit?.matchMedia(`(min-width: ${MediaSizes.DESKTOP}px)`),
    isTablet: windowInit?.matchMedia(`(min-width: ${MediaSizes.TABLET}px) and (max-width: ${MediaSizes.DESKTOP - 1}px)`),
    isMobile: windowInit?.matchMedia(`(max-width: ${MediaSizes.TABLET - 1}px)`),
  }

  const mediaQueriesKeys = Object.keys(mediaQueries) as Array<keyof typeof mediaQueries>;

  const [values, setValues] = useState(mediaQueriesKeys.map(key => mediaQueries[key]?.matches));

  useLayoutEffect(() => {
    const handler = (): void => { setValues(mediaQueriesKeys.map(key => mediaQueries[key]?.matches)); };

    mediaQueriesKeys.forEach((key) => {
      if (typeof mediaQueries[key]?.addEventListener === 'function') {
        mediaQueries[key].addEventListener('change', handler);
      } else {
        mediaQueries[key].addListener(handler);
      }
    });

    return () => {
      mediaQueriesKeys.forEach((key) => {
        if (typeof mediaQueries[key]?.addEventListener === 'function') {
          mediaQueries[key].removeEventListener('change', handler);
        } else {
          mediaQueries[key].removeListener(handler);
        }
      });
    }
  }, []);

  return mediaQueriesKeys.reduce<mediaQueriesPropsReturn>(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {
      isDesktop: false,
      isMobile: false,
      isTablet: false,
    },
  );
};

export default useMatchMedia;
