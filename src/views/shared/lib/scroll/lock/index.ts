import { addScrollableSelector, clearQueueScrollLocks, disablePageScroll, enablePageScroll, getPageScrollBarWidth } from 'scroll-lock';

export class ScrollLock {
  public lock(element?: HTMLElement): void {
    addScrollableSelector(['[data-overlayscrollbars-viewport]', '[data-scroll-lock-scrollable]', '.data-scroll-lock-scrollable']);
    disablePageScroll(element);

    this.setScrollBarWidthVar();
  }

  public enable(element?: HTMLElement): void {
    enablePageScroll(element);

    this.removeScrollBarWidthVar()
  }

  public enableAll(): void {
    clearQueueScrollLocks();
    enablePageScroll();

    this.removeScrollBarWidthVar()
  }

  public setScrollBarWidthVar(): void {
    const scrollBarWidth = getPageScrollBarWidth();
    document.body.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);
  }

  public removeScrollBarWidthVar(): void {
    document.body.style.removeProperty('--scrollbar-width');
  }
}
