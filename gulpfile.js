const gulp = require('gulp'),
      sass = require('gulp-sass')
 
gulp.task('scss', () => {
  return gulp
  .src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
})
 
gulp.task('watch', () => {
  gulp.watch('./sass/**/*.scss', gulp.series('scss'))
})