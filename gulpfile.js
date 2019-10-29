// ! STYLES BLOCK
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const SASS = require('gulp-sass');

const STYLEFiles = [
  './node_modules/normalize.css/normalize.css',
  './src/css/**/*.css',
  './src/sass/**/*.sass'
]

// ! JS BLOCK
const uglify = require('gulp-uglify');

const JSFiles = [
    './src/js/lib.js',
    './src/js/**/*.js'
];

// * SUPPORT BLOCK
const DEL = require('del');
const browserSync = require('browser-sync').create();

// ! TASKS BLOCK
function sass(){
  return gulp.src(STYLEFiles)
              .pipe(SASS().on('error', SASS.logError))
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

              /* OPTIONAL
              .pipe(browserSync.stream());
              */

}

function scripts(){
  return gulp.src(JSFiles)
          .pipe(concat('all.js'))
          .pipe(uglify({
            toplevel: true
          }))
          .pipe(gulp.dest('./build/js'))

          /* OPTIONAL
          .pipe(browserSync.stream());
          */
}

function watch(){
  /* OPTIONAL
  browserSync.init({
    server: {
      baseDir: "./"
    },
    // if you need to share your gulp 
    // bundle, use tunnel mode
    tunnel: true
  });
  */

  gulp.watch(['./src/sass/**/*.sass',
              './src/css/**/*.css'], sass);  
  gulp.watch('./src/js/**/*.js', scripts);
  
  /* OPTIONAL
  gulp.watch('./*.html', browserSync.reload)  
  */
}

function clean(){
  return DEL(['build/*']);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('sass', sass);
gulp.task('watch', watch);

// ! You dont need to register it
gulp.task('clean', clean);

// you can use 'clean' or clean 
gulp.task('build',gulp.series('clean',
                      gulp.parallel('sass', 'scripts')
                  ));

gulp.task('dev', gulp.series('build','watch'));    

// ! ES6
// module.exports.watch = watch;