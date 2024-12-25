import { lazy, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { PopupsContainer } from './popups-container';
import PopupErrorFallback from '@/widgets/popups/variant/error-fallback';
import { ScrollLock } from '@/shared/lib/scroll';
import { emitEvent } from '@/shared/helpers/emitEvent';
import { type PopupComponentType, type PopupComponent } from '@/shared/lib/popups/types';

import './popups.scss';

const popups: Record<string, any> = {
  error: lazy(() => import("../variant/error")),
  'error-fallback': lazy(() => import("../variant/error-fallback")),
  message: lazy(() => import("../variant/message")),
}

const bodyScrollLock = new ScrollLock();

const decidePopupType = (variant?: PopupComponent['variant']): PopupComponentType => {
  if (variant === 'location') {
    return 'backdrop';
  }

  return ''
}

export const Popups: FCClass = () => {
  const [popupList, setPopupList] = useState<PopupComponent[]>([]);

  useEffect(() => {
    const listenerOpen = (event: CustomEvent<PopupComponent>): void => {
      openPopup(event.detail);
    }

    window.addEventListener('modalOpen', listenerOpen);

    return () => {
      window.removeEventListener('modalOpen', listenerOpen);
    }
  }, []);

  useEffect(() => {
    if (popupList.length > 0) {
      bodyScrollLock.lock()
    }

    const listenerClose = (): void => {
      emitEvent('closePopup', {
        index: popupList.length - 1,
      });
    }

    const closeOnEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        listenerClose();
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('modalClose', listenerClose);

    return () => {
      if (popupList.length > 0) {
        bodyScrollLock.enable()
      }

      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('modalClose', listenerClose);
    }
  }, [popupList]);

  const openPopup = (data: PopupComponent): void => {
    setPopupList((popupList) => {
      return [...popupList, {
        ...data,
      }];
    });
  }

  const closePopup = (): void => {
    setPopupList((popupList) => {
      return popupList.slice(0, -1);
    });
  }

  const closeAllPopups = (): void => {
    setPopupList(() => {
      return [];
    });
  };

  return (
    popupList.map((popup, index) => {
      const LazyPopup = popups[popup.variant];

      return (
        <ErrorBoundary
          key={index}
          fallback={
            <PopupsContainer
              index={index}
              LazyPopup={PopupErrorFallback}
              closePopup={closePopup}
              closeAllPopups={closeAllPopups}
              variant='error-fallback'
            />
          }
        >
          <PopupsContainer
            index={index}
            LazyPopup={LazyPopup}
            closePopup={closePopup}
            closeAllPopups={closeAllPopups}
            variant={popup.variant}
            popupType={decidePopupType(popup.variant)}
            {...popup.data}
          />
        </ErrorBoundary>
      )
    })
  );
}
