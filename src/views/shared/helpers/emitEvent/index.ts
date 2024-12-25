/**
 * Функция создания кастомного события
 */
export const emitEvent = (name: string, detail?: object): void => {
  window.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      detail,
    }),
  );
};
