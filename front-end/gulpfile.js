var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var tap = require('gulp-tap');
const path = require('path');
var concat = require('gulp-concat');
var fs = require("fs")
var browserify = require('gulp-browserify')
var webserver = require('gulp-webserver');
var htmlmin = require('gulp-htmlmin');
var jade = require('gulp-jade');
var gulpCompass = require('gulp-compass-compile')
var sleep = require('sleep');

gulp.task('css', function(){
  gulp.src('./input/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./output/css'))
    .pipe(tap(function(file, t) {
      console.log("css     Compiled: " + path.basename(file.path));
    }));
});

gulp.task('jade', function() {
  gulp.src('./input/*.jade')
    .pipe(jade({
      client: false
    }))
    .pipe(tap(function(file, t) {
      console.log("jade    Compiled: " + path.basename(file.path));
    }))
    .pipe(gulp.dest('./output'));

});
gulp.task('js', function() {
  gulp.src('./input/js/*.js')
    .pipe(gulp.dest('./output/js'));

});
gulp.task('webserver', function() {
  sleep.sleep(5);
  gulp.src('output')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('default', [ 'css', 'js', 'jade', 'webserver' ]);
gulp.watch('./input/sass/*.scss', ['css']);
gulp.watch('./input/*.jade', ['jade']);
gulp.watch('./input/js/*.js', ['js']);