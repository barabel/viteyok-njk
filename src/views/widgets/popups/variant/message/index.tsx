import { type TPopupChild } from '@/shared/lib/popups/types';
import cn from 'classnames';
import './popup-message.scss';
import { ReactButton, type TReactButton } from '@/shared/react/button';
import { DangerouslyInnerHTML } from '@/shared/react/dangerously-html';

export interface TPopupMessage {
  title?: string
  description?: string
  button?: TReactButton
}

const parentClass = 'popup-message' as const;
const classes = {
  parent: parentClass,
  icon: `${parentClass}__icon`,
  title: `${parentClass}__title`,
  description: `${parentClass}__description`,
  closeButton: `${parentClass}__close-button`,
} as const;

const PopupMessage: TPopupChild<TPopupMessage> = ({
  className,
  title,
  description,
  button,
  closePopup,
}) => {
  return (
    <div className={cn(classes.parent, className)}>
      {title && (
        <div className={cn(classes.title, 'h4')}>
          {title}
        </div>
      )}
      {description && (
        <DangerouslyInnerHTML
          className={cn(classes.description, 't1')}
        >
          {description}
        </DangerouslyInnerHTML>
      )}
      <ReactButton
        className={classes.closeButton}
        title={button?.title ?? ''}
        onClick={closePopup}
      />
    </div>
  );
};

export default PopupMessage;
