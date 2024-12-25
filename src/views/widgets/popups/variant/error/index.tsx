import { useContext } from 'react';
import { type TPopupChild } from '@/shared/lib/popups/types';
import { LocaleContext } from '@/widgets/popups/store/localization';
import PopupMessage from '@/widgets/popups/variant/message';

const PopupError: TPopupChild = ({
  className,
  closePopup,
}) => {
  const locale = useContext(LocaleContext);
  const titleError = locale?.getTranslation('titleError');
  const descriptionError = locale?.getTranslation('descriptionError');
  const buttonTextError = locale?.getTranslation('buttonTextError');

  return (
    <PopupMessage
      className={className}
      closePopup={closePopup}
      title={titleError}
      description={descriptionError}
      button={buttonTextError ? { title: buttonTextError } : undefined}
    />
  );
};

export default PopupError;
