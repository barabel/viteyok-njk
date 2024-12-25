import { createRoot } from 'react-dom/client';
import { Popups as ReactPopups } from './ui/popups';
import { Localization } from '@/shared/lib/localization';
import { LocaleContext } from './store/localization';

export const initPopup = (parent: HTMLElement): void => {
  parent.innerHTML = '';
  const popupsRoot = createRoot(parent);
  popupsRoot.render(<ReactPopups />);

  const instLocale = new Localization();

  popupsRoot.render(
    <LocaleContext.Provider value={instLocale}>
      <ReactPopups />
    </LocaleContext.Provider>,
  );
}
