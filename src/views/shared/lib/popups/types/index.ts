enum PopupTypes {
  default = '',
  centered = 'centered',
  backdrop = 'backdrop',
}

/** Тип попапа (модификатор стилей) */
export type PopupComponentType = PopupTypes | `${PopupTypes}`;

export interface PopupComponent {
  /** Вариант попапа (обратная связь, сообщение, видео-плеер) */
  variant: string
  /** Пропсы, прокидываемые в попап */
  data?: {
    /** Тип попапа (модификатор стилей) */
    popupType?: PopupComponentType
    [x: string]: any
  }
}

/** Пропсы по-умолчанию у попапов */
export type TPopupChild<K = object> = FCClass<{
  closePopup: () => void
} & K>;
