import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Тип из библиотеки ролапа
interface PreRenderedAsset {
  /** @deprecated Use "names" instead. */
  name: string | undefined;
  names: string[];
  /** @deprecated Use "originalFileNames" instead. */
  originalFileName: string | null;
  originalFileNames: string[];
  source: string | Uint8Array;
  type: 'asset';
}

/** Функция создает папки в билде, чтобы отдельно положить файлы (css, js, fonts, images) */
function getFileName(assetInfo: PreRenderedAsset) {
  const assetName = assetInfo.names?.[0] ?? '';

  let extType = assetName.split(".").pop() ?? '';

  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
    extType = "img";
  }

  if (/ttf|eot|woff2?/i.test(extType)) {
    extType = "fonts";
  }

  if (assetName === 'sprite.svg') {
    extType = "svg"
  }

  return `assets/${extType}/[name]-[hash][extname]`;
}

/**
 * Функция вовзращает список файлов в папке с определенным разрешением
 */
function getFilesWithExtension(dir: string, extension: string) {
  const results: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (path.extname(file) === extension) {
      results.push(filePath);
    }
  }

  return results;
}

/**
 * Фунцкия вовзращает массив объектов с данными по страницам (кроме страницы __index)
 */
function getNjkFiles(directory: string) {
  const njkFiles = getFilesWithExtension(directory, '.njk');

  return njkFiles
    .filter(file => path.basename(file) !== '__index.njk')
    .map(file => {
      return {
        file: path.relative(directory, file).replace('.njk', '.html'),
      };
    });
}

const listHtml = getNjkFiles(path.join(process.cwd(), 'src', 'views'));

const getGlobalData = () => {
  const fileData = fs.readFileSync(`./src/data/common.json`);

  return { ...JSON.parse(`${fileData}`) }
}

export { listHtml, getFileName, getGlobalData };