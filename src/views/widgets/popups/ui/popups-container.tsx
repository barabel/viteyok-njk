import { type MouseEventHandler, Suspense, useEffect, useRef, useState } from 'react';
import { type TPopupChild, type PopupComponentType, type PopupComponent } from '@/shared/lib/popups/types';
import cn from 'classnames';

export interface TPopupsContainer {
  LazyPopup: TPopupChild
  index: number
  closePopup: () => void
  closeAllPopups: () => void
  popupType?: PopupComponentType
  isCloseAll?: boolean
  variant: PopupComponent['variant']
}

export const PopupsContainer: FCClass<TPopupsContainer> = ({
  LazyPopup,
  index,
  closePopup,
  closeAllPopups,
  isCloseAll = false,
  popupType = '',
  ...props
}) => {
  const popups = useRef(null);
  const timerRef = useRef<NodeJS.Timeout>(undefined);
  const [isAppearing, setAppearing] = useState(false);
  const durationClose = 300;

  useEffect(() => {
    const handleCloseEvent = (event: CustomEvent): void => {
      if (event.detail.index === index) {
        closeCurrentPopup();
      }
    }

    window.addEventListener('closePopup', handleCloseEvent);

    setTimeout(() => {
      setAppearing(true);
    }, 10);

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('closePopup', handleCloseEvent);
    }
  }, []);

  const closeCurrentPopup = (): void => {
    if (isCloseAll) {
      closeAllPopups();
    } else {
      setAppearing(false);

      timerRef.current = setTimeout(() => {
        closePopup();
      }, durationClose);
    }
  }

  const closeByOverlayClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.target === popups.current) {
      closeCurrentPopup();
    }
  }

  return (
    <div
      ref={popups}
      className={cn(
        'popups',
        {
          'popups--appearing': isAppearing,
          [`popups--${popupType}`]: popupType,
        },
      )}
      onClick={closeByOverlayClick}
    >
      <div className='popups__wrapper'>
        <Suspense fallback={<></>}>
          <LazyPopup
            closePopup={closeCurrentPopup}
            {...props}
          />
        </Suspense>
      </div>
    </div>
  );
}
