import scrollToElement from 'scroll-to-element';

interface TScrollToSmoothlyOptions {
  duration?: number
  offset?: number
}

export const scrollToSmoothly = (element: HTMLElement, incOptions?: TScrollToSmoothlyOptions): void => {
  const options = {
    offset: 0,
    duration: 1500,
    ...incOptions,
  }

  scrollToElement(element, {
    ...options,
  });
}
