import { initPopup } from '@/widgets/popups';
import { saveUTM } from '@/shared/helpers/saveUTM';
import { setAllAnimations } from '@/shared/lib/animations';

// Рут для попапов
const popups = document.getElementById('popups');
if (popups) {
  initPopup(popups);
}

// Записывает utm-метки в сессию
try {
  if (!sessionStorage.getItem('utm')) {
    saveUTM();
  }
} catch (e) {
  console.error(e);
}

window.onload = () => {
  setAllAnimations();
}
