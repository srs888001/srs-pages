#!/usr/bin/env node

// yarn gulp build --gulpfile ./node_modules/srs-pages/lib/index.js --cwd .
//=> 
// srs-pages build
process.argv.push('--cwd')
process.argv.push(process.cwd())

process.argv.push('--gulpfile')
// require.resolve 当前路径
// 会找到package.json里面的main指向
process.argv.push(require.resolve('..'))

// 其实就是载入的'gulp-cli'
require('gulp/bin/gulp')