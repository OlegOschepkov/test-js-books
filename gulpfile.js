const gulp = require('gulp');
const plumber = require('gulp-plumber');
const srcmap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const pug = require('gulp-pug');
const cached = require('gulp-cached');

const pugToHtml = () => {
  return gulp.src('src/pug/pages/*.pug')
      .pipe(plumber())
      .pipe(pug({ pretty: true }))
      .pipe(cached('pug'))
      .pipe(gulp.dest('build'));
};

const css = () => {
  return gulp.src('src/scss/style.scss')
      .pipe(plumber())
      .pipe(srcmap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer({
        grid: true,
      })]))
      .pipe(gulp.dest('build/css'))
      .pipe(csso())
      .pipe(rename('style.min.css'))
      .pipe(srcmap.write('.'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
};

const js = () => {
  return gulp.src(['src/js/index.js'])
      .pipe(webpackStream(webpackConfig))
      .pipe(gulp.dest('build/js'))
};

const svgo = () => {
  return gulp.src('src/img/**/*.{svg}')
      .pipe(imagemin([
        imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {removeRasterImages: true},
              {removeUselessStrokeAndFill: false},
            ]
          }),
      ]))
      .pipe(gulp.dest('src/img'));
};

const sprite = () => {
  return gulp.src('src/img/sprite/*.svg')
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename('sprite_auto.svg'))
      .pipe(gulp.dest('build/img'));
};

const copySvg = () => {
  return gulp.src('src/img/**/*.svg', {base: 'src'})
      .pipe(gulp.dest('build'));
};

const copyImages = () => {
  return gulp.src('src/img/**/*.{png,jpg,webp}', {base: 'src'})
      .pipe(gulp.dest('build'));
};

const optimizeImages = () => {
  return gulp.src('build/img/**/*.{png,jpg}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({quality: 85, progressive: true}),
      ]))
      .pipe(gulp.dest('build/img'));
};

const createWebp = () => {
  const root = '';
  return gulp.src(`src/img/${root}**/*.{png,jpg}`)
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest(`src/img/${root}`));
};

const copy = () => {
  return gulp.src([
    'src/fonts/**',
    'src/img/**',
  ], {
    base: 'src',
  })
      .pipe(gulp.dest('build'));
};

const clean = () => {
  return del('build');
};

const syncServer = () => {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch('src/pug/**/*.pug', gulp.series(pugToHtml, refresh));
  gulp.watch('src/scss/**/*.{scss,sass}', gulp.series(css));
  gulp.watch('src/js/**/*.{js,json}', gulp.series(js, refresh));
  gulp.watch('src/img/**/*.svg', gulp.series(copySvg, sprite, pugToHtml, refresh));
  gulp.watch('src/img/**/*.{png,jpg,webp}', gulp.series(copyImages, pugToHtml, refresh));
};

const refresh = (done) => {
  server.reload();
  done();
};

const start = gulp.series(clean, svgo, copy, css, sprite, js, pugToHtml, syncServer);

const build = gulp.series(clean, svgo, copy, css, sprite, js, pugToHtml, optimizeImages, createWebp);

exports.imagemin = optimizeImages;
exports.webp = createWebp;
exports.start = start;
exports.build = build;
