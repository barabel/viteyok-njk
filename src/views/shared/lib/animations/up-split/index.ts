import { gsap } from 'gsap';
import { SplitText } from '@/shared/lib/gsap-bonus/SplitText';
import { lazyCallback } from '@/shared/helpers/lazyCallback';
import { debounce } from '@/shared/helpers/debounce';

gsap.registerPlugin(SplitText);

interface ISplit extends SplitText {
  split: (props: any) => SplitText
}

const splitOptions = {
  type: 'lines',
  tag: 'span',
};

export const setAnimationUpSplit = (element: HTMLElement): void => {
  const parentClass = 'animation-up-split' as const;
  const classes = {
    parent: parentClass,
    line: `${parentClass}__line`,
  } as const;

  const split = new SplitText(element, splitOptions) as unknown as ISplit;

  let lines = split.lines;
  lines.forEach((line) => {
    line.classList.add(classes.line);
  });

  const { top } = element.getBoundingClientRect();

  const handleAnimation = (): void => {
    element.classList.add(`${classes.parent}--active`);

    let delay = 0;
    lines.forEach((line, index) => {
      delay = delay + (index * 200);

      setTimeout(() => {
        line.classList.add(`${classes.line}--active`);
      }, delay);
    });
  }

  let lazyCallbackObserver: IntersectionObserver;
  if (top < 0) {
    handleAnimation();
  } else {
    lazyCallbackObserver = lazyCallback(element, handleAnimation, '0px 0px 0px 0px');
  }

  // Код чтобы заного пересчитать линии при изменение размера экрана
  window.addEventListener('resize', debounce(() => {
    lazyCallbackObserver?.unobserve(element);
    split.split(splitOptions);

    lines = split.lines;
    lines.forEach((line) => {
      line.classList.add(classes.line);
    });

    if (element.classList.contains(`${classes.parent}--active`)) {
      lines.forEach((line) => {
        line.classList.add(`${classes.line}--show`);
      });
    } else {
      const { top } = element.getBoundingClientRect();

      if (top < 0) {
        handleAnimation();
      } else {
        lazyCallbackObserver = lazyCallback(element, handleAnimation, '0px 0px 0px 0px');
      }
    }
  }));
}
