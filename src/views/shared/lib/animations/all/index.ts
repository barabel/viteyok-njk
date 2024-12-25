import { setAnimationFadeInUp } from '../fade-in-up';
import { setAnimationFadeShow } from '../fade-show';
import { setAnimationUpSplit } from '../up-split';

const animations = {
  'animation-up-split': setAnimationUpSplit,
  'animation-fade-in-up': setAnimationFadeInUp,
  'animation-fade-show': setAnimationFadeShow,
};

export const setAllAnimations = (): void => {
  Object.entries(animations).forEach(([animationName, animationSetter]) => {
    const animationElements = Array.from(document.querySelectorAll<HTMLElement>(`.${animationName}`));

    if (animationElements.length) {
      animationElements.forEach((element) => {
        animationSetter(element);
      });
    }
  });
}
