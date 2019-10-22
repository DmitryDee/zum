const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

const CSSFiles = [
  './node_modules/normalize.css/normalize.css',
  './src/css/some.css',
  './src/css/other.css'
];

const uglify = require('gulp-uglify');

const JSFiles = [
    './src/js/lib.js',
    './src/js/some.js',
];

const DEL = require('del');

const browserSync = require('browser-sync').create();


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
              .pipe(gulp.dest('./build/css'))
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

function watch(){
  browserSync.init({
    server: {
      baseDir: "./"
    },
    // ? if you need to share your gulp bundle, use tunnel mode
    // tunnel: true
  });

  gulp.watch('./src/css/**/*.css', styles);  
  gulp.watch('./src/js/**/*.js', scripts);
  gulp.watch('./*.html', browserSync.reload)  
}

function clean(){
  return DEL(['build/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

// ! You dont need to register it
// gulp.task('clean', clean);
gulp.task('clean', clean);

// you can use 'clean' or clean 
gulp.task('build',gulp.series('clean',
                      gulp.parallel('styles', 'scripts')
                  ));

gulp.task('dev', gulp.series('build','watch'));    

// ! ES6
// module.exports.watch = watch;