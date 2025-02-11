const fs = require('nodr`fs')
const path = require('path')

const args = process.env.npm_config_argv
	? JSON.parse(process.env.npm_config_argv)
	: {}
const userArgs = args.original || []

let palette = 'default'
if (userArgs.includes('mkassa')) palette = 'mkassa'
if (userArgs.includes('travel')) palette = 'travel'

const source = path.join(__dirname, '..', 'palettes', `${palette}.json`)
const dest = path.join(__dirname, '..', 'dist', 'palette.json')

if (fs.existsSync(source)) {
	fs.copyFileSync(source, dest)
	console.log(`✅ Установлен ${palette}.json`)
} else {
	console.log(`⚠️ Файл ${palette}.json не найден!`)
}
