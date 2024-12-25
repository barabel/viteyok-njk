import { type TPopupChild } from '@/shared/lib/popups/types';
import PopupMessage from '@/widgets/popups/variant/message';

export interface TPopupErrorFallback {
  title?: string
  description?: string
  closeButtonTitle?: string
}

const PopupErrorFallback: TPopupChild<TPopupErrorFallback> = ({
  title = 'Ошибка',
  description = 'Ошибка модального окна',
  closeButtonTitle = 'Закрыть',
  closePopup,
}) => {
  return (
    <PopupMessage
      title={title}
      description={description}
      button={{ title: closeButtonTitle }}
      closePopup={closePopup}
    />
  );
}

export default PopupErrorFallback
