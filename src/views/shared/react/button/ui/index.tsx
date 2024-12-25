import cn from 'classnames';
import './react-button.scss';

export interface TReactButton {
  title?: string
  onClick?: () => void
}

const parentClass = 'react-button' as const;
const classes = {
  parent: parentClass,
  wrapper: `${parentClass}__wrapper`,
  content: `${parentClass}__content`,
  wrapperIcon: `${parentClass}__wrapper-icon`,
  icon: `${parentClass}__icon`,
} as const;

export const ReactButton: FCClass<TReactButton> = ({
  className,
  title,
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(classes.parent, className)}
      onClick={onClick}
      {...props}
    >
      {title}
    </button>
  );
}
