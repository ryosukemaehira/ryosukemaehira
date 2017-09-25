var gulp = require('gulp');
var imagemin = require("gulp-imagemin");
var scss = require('gulp-scss');
var haml = require('gulp-ruby-haml');
var autoprefixer  = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var minimizeHtml = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var webserver = require('gulp-webserver');

gulp.task('transfarImages', function(){
  gulp.src('./src/images/**/*')
      .pipe(gulp.dest('./app/images/'));
});

gulp.task('minimizeImage', function(){
  gulp.src('./src/images/**/')
      .pipe(imagemin())
      .pipe(gulp.dest('./app/images/'));
});

gulp.task('compile-haml', function () {
  gulp.src('./src/*.haml')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(haml())
    .pipe(gulp.dest('./app'));
});

gulp.task('compile-scss', function () {
  gulp.src('./src/scss/style.scss')
    .pipe(autoprefixer({
      browsers: ["last 2 versions", "ie >= 9", "Android >= 4","ios_saf >= 8"],
      cascade: false
    }))
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(scss())
    //.pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./app/css/'))
})

gulp.task('compile', ['compile-scss', 'compile-haml', 'transfarImages']);

gulp.task(
  'watch',
  function() {
    gulp.watch('src/**/*', ['compile'])
  }
);

gulp.task(
  'webserver',
  function() {
    gulp.src('./app')
      .pipe(webserver({
        open: true,
        port: 9000
      }));
  }
);

gulp.task('dev', ['compile', 'watch', 'webserver']);
