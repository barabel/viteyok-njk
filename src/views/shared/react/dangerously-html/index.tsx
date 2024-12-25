import { type FC, type HTMLProps, forwardRef } from 'react';

interface DangerouslyInnerHTMLProps extends HTMLProps<HTMLDivElement> {
  children: string
}

/**
 * компонент для вставки html тэгов
 */
export const DangerouslyInnerHTML: FC<DangerouslyInnerHTMLProps> = forwardRef((
  { className, children, ...props },
  ref,
) => {
  if (typeof children === 'string') {
    return (
      <div
        {...props}
        className={className}
        ref={ref}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    );
  }

  return null;
});
