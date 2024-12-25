/**
 * Вытаскивает из query-string URL параметр `_utm` и сохраняет его в sessionStorage.
 */
export const saveUTM = (): void => {
  if (window === undefined) return;

  const params = new URLSearchParams(window.location.search.substring(1));

  const entries = [...params.entries()]
    .filter(([name]) => {
      return name.startsWith('utm_');
    });

  const utm = Object.fromEntries(entries);

  try {
    sessionStorage.setItem('utm', JSON.stringify(utm, null, 2));
  } catch (e) {
    console.error(e);
  }
};
