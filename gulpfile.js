var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var gulpIf = require('gulp-if');
var del = require('del');
var runSequence = require('run-sequence');
var babel = require('gulp-babel');

// Transpiles and ES6 into ES5
gulp.task('js', () => {
  return gulp.src('app/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/js'));
});

// Compile SCSS to CSS and reload browser to show changes
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') //match all files in child folders that end in .scss
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compile SCSS to CSS, when css, html, or js file changed reload the browser
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/js/**/*.js',['js']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Start dev server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
  })
});

// Concats and minifies the css/js files into one single file
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Copy fonts over to dist
gulp.task('fonts', function() {
  return gulp.src('app/webfonts/**/*')
  .pipe(gulp.dest('dist/webfonts'))
});

// Copy Font Awesome over to dist
gulp.task('fa', function() {
  return gulp.src('app/fa/**/*')
  .pipe(gulp.dest('dist/fa'))
});

// Copy fonts over to dist
gulp.task('images', function() {
  return gulp.src('app/img/**/*')
  .pipe(gulp.dest('dist/img'))
});

// Clean old files from 'dist' folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// Create production ready files in 'dist' folder
gulp.task('build', function (callback) {
  console.log('Building files');
  runSequence('clean:dist',
    ['sass', 'fonts', 'images', 'fa', 'js'], 'useref',
    callback
  );
});