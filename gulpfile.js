var del = require('del');
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pxtorem = require('gulp-pxtorem');
var minifyCSS = require('gulp-minify-css'); 
var jade = require('gulp-jade');
var minifyHTML = require('gulp-minify-html'); 
var webserver = require('gulp-webserver');

var PATH = {
  src: 'src/',
  dst: 'dist/'
};

gulp.task('clean', function() {
  return del([
    PATH.dst + 'css/*',
    PATH.dst + 'js/*',
    PATH.dst + '*.html',
    '!'+PATH.dst + 'lib/**/*'
  ]);
});

gulp.task('css', function() {
  gulp.src(PATH.src + 'styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(pxtorem({
      prop_white_list: [],
      media_query: true
    }))
    .pipe(minifyCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(PATH.dst + 'css'));
});

gulp.task('html', function() {
  gulp.src(PATH.src + '*.jade')
    .pipe(jade())
    .pipe(minifyHTML())
    .pipe(gulp.dest(PATH.dst));
});

gulp.task('copy', function() {
  gulp.src(PATH.src + 'js/**/*')
    .pipe(gulp.dest(PATH.dst + 'js'));
});

gulp.task('server', function() {
  console.log('Running on http://localhost:8000/');
  gulp.src(PATH.dst)
    .pipe(webserver({ livereload: true }));
});
 

gulp.task('default', ['clean'], function() {
  gulp.start(['copy', 'css', 'html', 'server'], function() {
    gulp.watch(PATH.src + 'styles/**/*.scss', ['css']);
    gulp.watch(PATH.src + '*.jade', ['html']);
    gulp.watch(PATH.src + 'js/**/*', ['copy']);
  });
});
