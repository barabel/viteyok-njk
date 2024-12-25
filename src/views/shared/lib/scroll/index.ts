export { ScrollLock } from './lock';
export { ScrollCustom, ScrollbarsTheme, type OverlayScrollbars } from './custom';
export { scrollToSmoothly } from './to-smoothly';

/**
 * Функция возвращает размер скроллбара на странице
 */
export const getScrollBarWidth = (): number => {
  return window.innerWidth - document.documentElement.clientWidth;
}
