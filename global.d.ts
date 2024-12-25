declare global {
  type FCClass<P = object> = React.FC<
  P &
  React.PropsWithChildren & {
    className?: string
  }
  >;

  interface WindowEventMap {
    modalOpen: CustomEvent
    closePopup: CustomEvent
    'accordion-colored-open': CustomEvent<{
      parent: HTMLElement
    }>
  }

  interface Window {
    localeInst?: Localization
    YT?: any
    onYouTubeIframeAPIReady?: () => void
    ymapsMap?: any
  }

  module '*.module.scss';
}

declare module 'react-select/dist/declarations/src/Select' {
  export interface Props<
    Option,
    IsMulti extends boolean, // eslint-disable-line @typescript-eslint/no-unused-vars
    Group extends GroupBase<Option>, // eslint-disable-line @typescript-eslint/no-unused-vars
  > {
    prefix?: string
  }
}

export {};
