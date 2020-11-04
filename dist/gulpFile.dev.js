"use strict";

// import moduel from node moduel
var gulp = require('gulp');

var concat = require('gulp-concat');

var autoPrefixer = require('gulp-autoprefixer');

var sass = require('gulp-sass');

sass.compiler = require('node-sass');

var pug = require('gulp-pug');

var watch = require('gulp-watch');

var livereload = require('gulp-livereload');

var sourcemaps = require('gulp-sourcemaps');

var uglify = require('gulp-uglify');

var notify = require("gulp-notify");

var notifier = require('node-notifier');

var htmlImport = require('gulp-html-import'); //tasks


gulp.task('taskname', function () {
  return gulp.src("src/*.html").pipe(gulp.dest("dist")).pipe(notify({
    message: "file1_2 created.",
    onLast: true
  })).pipe(livereload());
});
gulp.task('import', function () {
  gulp.src('src/*.html').pipe(htmlImport('src/component/')).pipe(gulp.dest('dist'));
});
gulp.task('fonts', function () {
  return gulp.src('src/font/**/*.{eot,svg,ttf,woff,woff2}', function (err) {}).pipe(gulp.dest('dist/fonts'));
});
gulp.task('img', function () {
  return gulp.src('src/img/**/*.{png,jpg,ico,jpeg,gif}', function (err) {}).pipe(gulp.dest('dist/img'));
}); //css task

gulp.task('css', function () {
  return gulp.src("src/css/*.css").pipe(autoPrefixer('last 2 versions', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 1%', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11')).pipe(concat('main.css')).pipe(uglify()).pipe(sourcemaps.write('.')).pipe(gulp.dest("dist/css")).pipe(notify("Hello css!")).pipe(livereload());
}); //sass

gulp.task('sass', function () {
  return gulp.src("src/scss/*.scss").pipe(sass({
    outputStyle: 'compressed'
  })).pipe(autoPrefixer('last 2 versions', 'safari 5', 'opera 12.1', 'ios 6', 'android 4', '> 1%', 'firefox >= 4', 'safari 7', 'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11')).pipe(concat('main.css')).pipe(uglify()).pipe(sourcemaps.write('.')).pipe(gulp.dest("dist/css")).pipe(notify("Hello js!")).pipe(livereload());
}); //js task

gulp.task('js', function () {
  return gulp.src("src/scripts/*.js").pipe(concat('main.js')).pipe(uglify()).pipe(sourcemaps.write('.')).pipe(gulp.dest("dist/scripts")).pipe(notify("Hello pug!")).pipe(livereload());
}); //pug

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pug/about.pug').pipe(pug({
    pretty: true
  })).pipe(gulp.dest("dist/pug")).pipe(notify("Hello pug!")).pipe(livereload());
}); //watch

gulp.task('see', function () {
  require('./server');

  livereload.listen();
  gulp.watch('src/index.html', gulp.series('taskname'));
  gulp.watch('src/css/*.css', gulp.series('css'));
  gulp.watch('src/scss/*.scss', gulp.series('sass'));
  gulp.watch('src/scripts/*.js', gulp.series('js'));
  gulp.watch('src/pug/about.pug', gulp.series('pug'));
  notifier.notify({
    title: 'Production Build',
    message: 'Done'
  });
  gulp.watch(['dist/**/*']).on('change', function () {
    notify("Files updated").write('');
  });
});
//# sourceMappingURL=gulpFile.dev.js.map
