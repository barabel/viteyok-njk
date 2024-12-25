import { type MutableRefObject, useEffect } from 'react';

/**
 * Хук выполняет каллбак при клике за элементом
 * @param ref - реф элемента
 * @param callback - калбак
 */
export const useOutsideClick = (ref: MutableRefObject<HTMLElement | null>, callback: () => void): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): any => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
