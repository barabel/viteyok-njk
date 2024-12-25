import { openPopup } from '@/shared/lib/popups';

const checkPopupButton = document.querySelector<HTMLElement>('.check-popup');
if (checkPopupButton) {
  checkPopupButton.addEventListener('click', () => {
    openPopup('message', {
      title: 'Попап',
      description: 'Открыт',
      button: {
        title: "закрыть",
      },
    });
  });
}
