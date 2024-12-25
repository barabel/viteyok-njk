import { lazyCallback } from '@/shared/helpers/lazyCallback';

export const setAnimationFadeInUp = (element: HTMLElement): void => {
  const animationClass = 'animation-fade-in-up' as const;
  const animationClassActive = `${animationClass}--active` as const;

  const { top } = element.getBoundingClientRect();

  if (top < 0) {
    element.classList.add(animationClassActive);
  } else {
    lazyCallback(element, () => {
      element.classList.add(animationClassActive);
    }, '0px 0px 0px 0px');
  }
}
