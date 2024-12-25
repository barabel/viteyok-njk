import { promises as fs } from 'fs';
import path from 'path';
import process from 'process';
import generateSvgEnum from '../cli/generate-sprites/generate-sprites.js';
import { optimize } from 'svgo';

const iconsDir = path.join(process.cwd(), 'src', 'assets', 'svg');
const iconsDirName = path.dirname(path.join(process.cwd(), 'src', 'assets', 'svg', '*.svg'));
const spriteFileLocation = path.join(process.cwd(), 'static', 'sprite.svg');

/**
 * Плагин для создания свг спрайта (https://kld.dev/svg-icon-system-vite-edition/ немного модернизированная версия)
 */
export default function IconSpritePlugin() {
  async function generateIconSprite() {
    // Считывает свг файлы в папке
    const files = await fs.readdir(iconsDir);
    let symbols = '';

    // Создает свг спрайт из свг файлов
    for (const file of files) {
      if (!file.endsWith('.svg')) continue;
      let svgContent = await fs.readFile(path.join(iconsDir, file), 'utf8');
      const id = file.replace('.svg', '');
      svgContent = svgContent
        .replace(/id="[^"]+"/, '')
        .replace('<svg', `<symbol id="${id}"`)
        .replace('</svg>', '</symbol>');
      symbols += svgContent + '\n';
    }

    // Записывает полученное свг
    const sprite = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n\n${symbols}</svg>`;

    const optimizedSprite = optimize(sprite, {
      plugins: [],
    }).data;

    await fs.writeFile(spriteFileLocation, optimizedSprite);

    generateSvgEnum();
  }

  return {
    name: 'icon-sprite-plugin',
    buildStart() {
      // Генерит спрайт при билде
      return generateIconSprite();
    },
    configureServer(server) {
      const watcher = server.watcher;

      // Генерит спрайт, если изменения произошли в папке с иконками
      const regenerateSprite = async(event, changedPath) => {
        const allowedEvent = ['add', 'change', 'unlink'];

        if (allowedEvent.includes(event)) {
          const changedPathDirName = path.dirname(changedPath);
          const relativePath = path.relative(iconsDirName, changedPathDirName);

          const isSameDirWhereIconsLocated = relativePath === '';

          if (isSameDirWhereIconsLocated) {
            return generateIconSprite();
          }
        }
      }

      watcher.on('all', regenerateSprite);
    },
  };
}
