import { emitEvent } from '@/shared/helpers/emitEvent';
import { getDataPopupUrl } from './api';
import { type PopupComponentType, type PopupComponent } from './types';

/**
 * Функция открывает попап заданного варианта(варианты находятся в widgets/popups), с пропсами, переданные в объект data
 */
export const openPopup = (variant: PopupComponent['variant'], data?: PopupComponent['data']): void => {
  emitEvent('modalOpen', {
    variant,
    data,
  });
}

interface IOpenPopupThroughApi {
  /** Апи, по-которому пойдет запрос на получение данных попапа */
  action: string
  /** Вариант попапа (обратная связь, сообщение, видео-плеер) */
  variant: PopupComponent['variant']
  /** Пропсы, прокидываемые в попап, в дополнение к которым придут через апи */
  data?: PopupComponent['data']
  /** Тип попапа (модификатор стилей) */
  popupType?: PopupComponentType
}

/**
 * Отправляет запрос и открывает нужный попап по полученным данным
 */
export const openPopupThroughApi = ({
  action,
  variant,
  data,
  popupType,
}: IOpenPopupThroughApi): void => {
  getDataPopupUrl(action).then(res => {
    if (res) {
      openPopup(variant, {
        ...res,
        ...data,
        popupType,
      });
    }
  }).catch(err => { console.error(err); })
};
