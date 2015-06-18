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
  htmlmin = require('gulp-htmlmin'),
  uglify = require('gulp-uglify');

var paths = {
  images: ['app/images/*.*'],
  fonts: ['app/fonts/**'],
  fav: ['app/favicon.png'],
  sass: ['app/styles/sass/main.sass',
        'app/styles/sass/contact.sass',
        'app/styles/sass/portfolio.sass',
        'app/styles/sass/login.sass'],
  html: ['app/*.html'],
  js: ['app/scripts/*.js']
}

gulp.task('production', ['bower', 'sass', 'html', 'images', 'js', 'fav', 'fonts'])
gulp.task('default', ['bower', 'sass', 'html', 'images', 'js', 'fav', 'fonts', 'watch']);
gulp.task('clean', function(){
  gulp.src('dist', {
    read: false
  })
    .pipe(clean());
});

gulp.task('html', function() {
  gulp.src(paths.html)
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./dist'))
})

gulp.task('sass', function() {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(prefix("last 10 version", "> 1%", "ie 8"))
    .pipe(minifyCss({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('./dist/styles'))
});

gulp.task('bower', function () {
  gulp.src('./app/*.html')
    .pipe(wiredep({
      directory: "bower_components"
    }))
    .pipe(gulp.dest('./app'));
});

gulp.task('images', function(){
  gulp.src(paths.images)
  .pipe(gulp.dest('dist/images/'));
});
gulp.task('js', function(){
  gulp.src(paths.js)
  .pipe(gulp.dest('dist/scripts/'));
});
gulp.task('fav', function(){
  gulp.src(paths.fav)
  .pipe(gulp.dest('dist/'));
});
gulp.task('fonts', function(){
  gulp.src(paths.fonts)
  .pipe(gulp.dest('dist/fonts/')); 
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch('app/styles/sass/*.sass', ['sass']).on('change', livereload.changed);
  gulp.watch('app/*.html', ['html']).on('change', livereload.changed);
});