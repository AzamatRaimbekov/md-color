const fs = require('fs')
const path = require('path')

// Читаем переданный параметр из npm_config_theme
const theme = process.env.npm_config_theme || 'default'

// Пути к файлам
const source = path.join(__dirname, '..', 'brands', `${theme}.json`)
const dest = path.join(__dirname, '..', 'brand.json')

if (fs.existsSync(source)) {
	fs.copyFileSync(source, dest)
	console.log(`✅ Установлена тема: ${theme}`)
} else {
	console.error(`⚠️ Тема ${theme}.json не найдена! Устанавливаем default.json`)
	fs.copyFileSync(path.join(__dirname, '..', 'palettes', 'default.json'), dest)
}
