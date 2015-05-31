'use strict';

var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	livereload = require('gulp-livereload'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
  wiredep = require('wiredep').stream,
  useref = require('gulp-useref'),
  minifyCss = require('gulp-minify-css'),
  gulpif = require('gulp-if'),
  clean = require('gulp-clean'),
  uglify = require('gulp-uglify');

var paths = {
  images: ['app/images/**'],
  fonts: ['app/fonts/**'],
  fav: ['app/favicon.png'],
  css: ['app/styles/css/main.css'],
  html: ['app/*.html']
}


gulp.task('default', ['sass', 'watch']);

gulp.task('sass', function() {
  gulp.src('app/styles/sass/main.sass')
    .pipe(sass())
    .pipe(prefix("last 10 version", "> 1%", "ie 8", "ie 7"))
    .pipe(gulp.dest('app/styles/css'))
});
gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('app/styles/sass/*.sass', ['sass']).on('change', livereload.changed);
  gulp.watch('app/*.html').on('change', livereload.changed);
});

gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory: "bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('clean', function(){
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('production', ['images', 'fonts', 'fav', 'css','html'])


gulp.task('images', function(){
  gulp.src(paths.images)
  .pipe(gulp.dest('dist/images/'));
});
gulp.task('fonts', function(){
  gulp.src(paths.fonts)
  .pipe(gulp.dest('dist/fonts/'));
});
gulp.task('fav', function(){
  gulp.src(paths.fav)
  .pipe(gulp.dest('dist/'));
});
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(gulp.dest('dist/'));
});
gulp.task('css', function(){
  gulp.src(paths.css)
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(gulp.dest('dist/styles/css/'));
});