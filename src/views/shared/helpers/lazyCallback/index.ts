/**
 * Функция ставит обзервер и запускает каллбак, когда блок почти у вьюпорта появился (по-умолчанию). После появления обзервер удаляется (лези загрузка по-сути)
 */
export const lazyCallback = (target: HTMLElement, callback: () => any, rootMargin: string = '0px 0px 50% 0px'): IntersectionObserver => {
  const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
    const [entry] = entries;
    if (!entry.isIntersecting) {
      return
    };

    if (callback) {
      callback();
    }

    observer.unobserve(entry.target);
  }

  const observer = new IntersectionObserver(observerCallback, {
    root: null,
    rootMargin,
    threshold: 0.1,
  });

  observer.observe(target);

  return observer;
}
