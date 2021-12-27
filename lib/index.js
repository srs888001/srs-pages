const { src, dest, series, parallel, watch } = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const del = require('del')
const browserSync = require('browser-sync')
const cwd = process.cwd()

const bs = browserSync.create()
// 自动会把gulp-去除， 如果是gulp-sass-xxx，会变成sass-Xxx
const plugins = loadPlugins()
const sass = plugins.sass(require('sass'))

let config = {
  // default config
  build: {
    src: 'src',
    dist: 'dist',
    temp: 'temp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  }
}
// 合并config
try {
  const loadConfig = require(`${cwd}/pages.config.js`)
  config = Object.assign({}, config, loadConfig)
} catch (e) {}

const clean = () => {
  return del([config.build.dist, config.build.temp])
}

const style = () => {
  // base: 'src' 标记文件路径，用于生成的文件也是这个路径
  // cwd: 'src' 标记当前文件路径
  return src(config.build.paths.styles, { base: config.build.src, cwd: config.build.src })
    // 展开模式，输出的css后括号在单独一行
    // 同时会把_前缀的scss合并到main里面
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(dest(config.build.temp))
    // 以流的方式像浏览器推 
    // .pipe(bs.reload({stream: true}))
}

const script = () => {
  return src(config.build.paths.scripts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.babel({ presets: [require('@babel/preset-env')]}))
    .pipe(dest(config.build.temp))
    // 以流的方式像浏览器推 
    // .pipe(bs.reload({stream: true}))
}

const page = () => {
  return src(config.build.paths.pages, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.swig({ data: config.data, defaults: { cache: false }}))// 防止模板缓存导致页面不能及时更新
    .pipe(dest(config.build.temp))
    // 以流的方式像浏览器推 
    // .pipe(bs.reload({stream: true}))
}

const image = () => {
  return src(config.build.paths.images, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist))
}

const font = () => {
  return src(config.build.paths.fonts, { base: config.build.src, cwd: config.build.src })
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.dist))
}

const extra = () => {
  return src('**', { base: config.build.public, cwd: config.build.public })
    .pipe(dest(config.build.dist))
}

const serve = () => {
  watch(config.build.paths.styles, { cwd: config.build.src }, style)
  watch(config.build.paths.scripts, { cwd: config.build.src }, script)
  watch(config.build.paths.pages, { cwd: config.build.src }, page)
  // watch('src/assets/images/**', image)
  // watch('src/assets/fonts/**', font)
  // watch('public/**', extra)
  watch([
    config.build.paths.images,
    config.build.paths.fonts
  ], { cwd: config.build.src }, bs.reload)

  watch('**', { cwd: config.build.public }, bs.reload)

  bs.init({
    notify: false,
    port: 2080,
    // open: false,
    files: `${config.build.temp}/**`, // 监听文件夹, 也可以不设置问题，通过在每个任务后面添加`bs.reload`
    server: {
      // 先从temp里面找，找不到到src，最后是src
      baseDir: [config.build.temp, config.build.dist, config.build.public],
      // 使用本地的node_modules
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  })
}

// <!-- build:css assets/styles/vendor.css -->
// <link rel="stylesheet" href="/node_modules/bootstrap/dist/css/bootstrap.css">
// <!-- endbuild -->
// <!-- build:css assets/styles/main.css -->
// <link rel="stylesheet" href="assets/styles/main.css">
// <!-- endbuild -->

const useref = () => {
  // 注释去掉， 同时把多个文件合并一起vendor.css
  return src(config.build.paths.pages, { base: config.build.temp, cwd: config.build.temp })
   // 一般从生成目录里面找， 常用的放前面
    .pipe(plugins.useref({ searchPath: [config.build.temp, '.'] }))
    // html js css
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
      // 去除空白符
      collapseWhitespace: true,
      // 压缩样式
      minifyCSS: true,
      // 压缩JS
      minifyJS: true
    })))
    .pipe(dest(config.build.dist))
}

// const compile = parallel(style, script, page, image, font)
// const build = series(clean, parallel(compile, extra))
const compile = parallel(style, script, page)
const build = series(clean, parallel(compile, extra, image, font), useref)
const develop = series(compile, serve)

module.exports = {
  clean,
  build,
  develop
}

