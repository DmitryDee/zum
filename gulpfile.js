// ! STYLES BLOCK
const gulp = require('gulp');

const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const SASS = require('gulp-sass');
const htmlbeautify = require('gulp-html-beautify');
const gulpImage = require('gulp-image');

const STYLEFiles = [
  // './node_modules/normalize.css/normalize.css',
  './node_modules/bootstrap/scss/bootstrap.scss',
  './src/css/**/*.css',
  './src/sass/**/*.sass'
]

// ! JS BLOCK
const uglify = require('gulp-uglify');

const JSFiles = [
    // './src/js/lib.js',
    './node_modules/jquery/dist/jquery.js',
    './node_modules/popper.js/dist/umd/popper.js',
    // bootstrap
    './node_modules/bootstrap/js/dist/util.js',
    './node_modules/bootstrap/js/dist/alert.js',
    './node_modules/bootstrap/js/dist/button.js',
    './node_modules/bootstrap/js/dist/carousel.js',
    './node_modules/bootstrap/js/dist/collapse.js',
    './node_modules/bootstrap/js/dist/dropdown.js',
    './node_modules/bootstrap/js/dist/modal.js',
    './node_modules/bootstrap/js/dist/tooltip.js',
    './node_modules/bootstrap/js/dist/popover.js',
    './node_modules/bootstrap/js/dist/scrollspy.js',
    './node_modules/bootstrap/js/dist/tab.js',
    './node_modules/bootstrap/js/dist/toast.js',
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
  // OPTIONAL
  browserSync.init({
    server: {
      baseDir: "./build/"
    },
    // if you need to share your gulp 
    // bundle, use tunnel mode
    // tunnel: true
  });

  gulp.watch(['./src/sass/**/*.sass',
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

// ! You dont need to register it
gulp.task('clean', clean);

// you can use 'clean' or clean 
gulp.task('build',gulp.series('clean',
                      gulp.parallel('sass', 'scripts', 'html', 'image')
                  ));

gulp.task('dev', gulp.series('build','watch'));    

// ! ES6
// module.exports.watch = watch;