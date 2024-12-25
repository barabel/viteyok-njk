import { OverlayScrollbars, type EventListeners, type PartialOptions } from 'overlayscrollbars';

export { type OverlayScrollbars };

export enum ScrollbarsTheme {
  default = 'os-theme-dark',
  light = 'os-theme-light',
  roundDark = 'os-theme-round',
}

interface ParamOptions {
  theme?: ScrollbarsTheme | `${ScrollbarsTheme}`
  options?: PartialOptions
  events?: EventListeners
}

export class ScrollCustom {
  private readonly generalOptions: { options: PartialOptions, theme: ScrollbarsTheme | `${ScrollbarsTheme}`, events?: EventListeners };
  private readonly options: PartialOptions;
  public scrollbar?: OverlayScrollbars;
  private readonly element: HTMLElement;
  private readonly events?: EventListeners;

  constructor(element: HTMLElement, paramOptions?: ParamOptions) {
    this.element = element;

    const defaultOptions = {
      theme: ScrollbarsTheme.default,
      options: {},
    }

    this.generalOptions = {
      ...defaultOptions,
      ...paramOptions,
    }

    const { theme, options: overlayOptions, events } = this.generalOptions;

    this.events = events;

    this.options = {
      overflow: this.generalOptions.options.overflow ?? {
        x: 'hidden',
        y: 'scroll',
      },
      ...overlayOptions,
      scrollbars: {
        theme,
      },
    };

    this.setScrollbar();
  }

  setScrollbar(): void {
    this.scrollbar = OverlayScrollbars(this.element, this.options, this.events);
  }

  destroy(): void {
    if (!this.scrollbar) return;

    this.scrollbar.destroy();
  }
}
