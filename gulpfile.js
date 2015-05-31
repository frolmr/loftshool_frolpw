'use strict';

var gulp = require('gulp'),
	concatCss = require('gulp-concat-css'),
	livereload = require('gulp-livereload'),
	prefix = require('gulp-autoprefixer'),
	sass = require('gulp-sass'),
  wiredep = require('wiredep').stream;


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