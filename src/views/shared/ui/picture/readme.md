### Комопнент picture

По-умолчанию все картинки лениво загружаются, для отмены ленивой загрузки используйте флаг noLazy

#### Пропсы:
- class: string, опциональный класс;
- src: string, путь к изображению;
- desktopBig: string, путь к изображению для разрешения 1920+
- desktop: string, путь к изображению для разрешения 1280+
- tablet: string, путь к изображению для разрешения 768+
- alt: string, альт для картинки
- title: string, тайтл для картинки
- noLazy: boolean, флаг отмены ленивой загрузки

#### Модификаторы:
--contain: к изображению применяется стиль object-fit: contain;

#### Пример данных:
```
"img": {
  "src": "/assets/img/view.jpg",
  "tablet": "/assets/img/view.jpg",
  "desktop": "/assets/img/view.jpg",
  "alt": "",
  "title": "",
  "noLazy": false
}
```
