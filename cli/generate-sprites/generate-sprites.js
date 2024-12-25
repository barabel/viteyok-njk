import fs from 'node:fs';
import path from 'node:path';

/**
 * Функция генерит энам иконок из свгшек
 *
 * Названия svg для спарйта дложны быть в camel case
 *
 * @param {string} svgPath путь до свг
 * @param {string} enumPath путь куда сохранить энам
 */
function generateSvgEnum(svgPath = 'src/assets/svg', enumPath = 'src/views/shared/enums/icons/index.ts') {
  /**
   * Расширение файла svg
   * @type {string}
   */
  const svgExt = '.svg';
  /**
   *  Регулярка для фильтра по svg
   * @type {RegExp}
   */
  const svgRegExp = /^.+\.svg$/;
  /**
   *  Начало enum конструкции
   * @type {string}
   */
  const startEnum = 'export enum IconsArray {\n';
  /**
   *  Завершение enum конструкции
   * @type {string}
   */
  const endEnum = '}\n';

  try {
    /**
     * Путь сохранения для enum файла
     * @type {string}
     */
    const srcEnum = enumPath;

    /**
     * Список файлов SVG
     * @type {string[]}
     */
    const filesList = fs.readdirSync(path.resolve(svgPath));
    /**
     *  Фильтруем только svg файлы
     * @type {string[]}
     */
    const onlySvg = filesList.filter((file) => svgRegExp.test(file));
    /**
     *  Собираем только имена
     * @type {string[]}
     */
    const onlyName = onlySvg.map((file) => file.replaceAll(svgExt, ''));
    /**
     *  Генерим значение для enum
     * @type {string[]}
     */
    const enumsString = onlyName.map((name) => `${name} = '${name}'`);

    /**
     * Строка для записи
     * @type {string}
     */
    let final = '';
    /**
     *  Стартуем
     * @type {string}
     */
    final += startEnum;
    /**
     *  Заполняем
     */
    enumsString.forEach((str) => {
      final += `  ${str},\n`;
    });
    /**
     *  Завершаем
     * @type {string}
     */
    final += endEnum;

    /**
     *  Записываем в файл
     */
    fs.writeFileSync(path.resolve(srcEnum), final, { encoding: 'utf-8' });
    console.log(`Файл: ${srcEnum} успешно записан`);
  } catch (e) {
    console.error(`Ошибка при создание enum файла для спрайтов\n${e}`);
  }
}

export default generateSvgEnum
