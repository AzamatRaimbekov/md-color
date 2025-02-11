const fs = require('fs');
const path = require('path');

// Читаем переданный параметр из npm_config_theme
const args = process.argv.slice(2);
let theme = 'default'; // по умолчанию

// Ищем аргумент --type и извлекаем его значение
args.forEach((arg) => {
  if (arg.startsWith('--type=')) {
    theme = arg.split('=')[1]; // Получаем значение после знака "="
  }
});

// Пути к файлам
const source = path.join(__dirname, '..', 'brands', `${theme}.json`); // Исходная папка brands
const dest = path.join(__dirname, '..', 'lib', 'brand.json'); // Целевая папка libs

console.log(`Пытаемся скопировать файл из ${source} в ${dest}`);

try {
  // Проверка существования исходного файла
  fs.accessSync(source, fs.constants.R_OK);
  fs.copyFileSync(source, dest); // Копируем файл
  console.log(`✅ Установлена тема: ${theme}`);
} catch (err) {
  console.error('Ошибка при копировании файла:', err);

  // Если исходного файла нет, используем default.json
  const defaultSource = path.join(__dirname, '..', 'palettes', 'default.json');
  fs.copyFileSync(defaultSource, dest);
  console.log('Используем default.json');
}
