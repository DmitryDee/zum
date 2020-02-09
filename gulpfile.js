const gulp = require('gulp');

const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const SASS = require('gulp-sass');
const htmlbeautify = require('gulp-html-beautify');
const gulpImage = require('gulp-image');
const uglify = require('gulp-uglify');
const DEL = require('del');
const browserSync = require('browser-sync').create();
const STYLEFiles = [
  './src/css/**/*.css',
  './src/scss/**/*.scss'
];
const JSFiles = [
    './node_modules/jquery/dist/jquery.js',
    './node_modules/slick-carousel/slick/slick.js',
    './src/js/**/*.js'
];

function sass(){
  return gulp.src(STYLEFiles)
              .pipe(SASS().on('error', SASS.logError))
              .pipe(concat('all.css'))
              .pipe(autoprefixer({
                cascade: false
              }))
              .pipe(cleanCSS({
                  compatibility: 'ie8',
                  level: 2
              }))
              .pipe(gulp.dest('./build/css'))
              .pipe(browserSync.stream());
}

function styles(){
  return gulp.src(CSSFiles)
              .pipe(concat('all.css'))
              .pipe(autoprefixer({
                  browsers: ['> 0.1%'],
                  cascade: false
              }))
              .pipe(cleanCSS({
                  compatibility: 'ie8',
                  level: 2
              }))
              .pipe(gulp.dest('./css'))
              .pipe(browserSync.stream());

}

function scripts(){
  return gulp.src(JSFiles)
          .pipe(concat('all.js'))
          .pipe(uglify({
            toplevel: true
          }))
          .pipe(gulp.dest('./build/js'))
          .pipe(browserSync.stream());
}


function html() {
  return gulp.src('./src/html/**/*.html')
            .pipe(htmlbeautify({
              indentSize: 2
            }))
            .pipe(gulp.dest('./build/'))
            .pipe(browserSync.stream());
}

function image(){
  return gulp.src('./src/img/*')
              .pipe(gulpImage())
              .pipe(gulp.dest('./build/img'));
}

function watch(){
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    tunnel: true
  });

  gulp.watch(['./src/scss/**/*.scss',
              './src/css/**/*.css'], sass);  
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./src/html/**/*.html', html);
  
  // gulp.watch('./src/html/**/*.html', browserSync.reload);  
}

function clean(){
  return DEL(['build/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('sass', sass);
gulp.task('html', html);
gulp.task('image', image);
gulp.task('watch', watch);

gulp.task('clean', clean);

gulp.task('build',gulp.series('clean',
                      gulp.parallel('sass', 'scripts', 'html', 'image')
                  ));

gulp.task('dev', gulp.series('build','watch'));