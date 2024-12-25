import React, { forwardRef } from 'react';
import cn from 'classnames';
import { type TIconId } from '@/shared/enums';

export interface IIconProps {
  className?: string
  icon: TIconId
  style?: React.CSSProperties
  onClick?: () => void
}

type Ref = SVGSVGElement;

export const Icon = forwardRef<Ref, IIconProps>((
  {
    className,
    icon,
    style,
    onClick,
    ...otherProps
  }, ref) => {
  return (
    <svg
      ref={ref}
      className={cn('react-icon', className)}
      style={style}
      onClick={onClick ?? undefined}
      {...otherProps}
    >
      <use href={`/sprite.svg#${icon}`} />
    </svg>
  );
});
