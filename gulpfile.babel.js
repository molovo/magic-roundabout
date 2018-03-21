import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglifyEs from 'uglify-es'
import composer from 'gulp-uglify/composer'
import clone from 'gulp-clone'
import rename from 'gulp-rename'

const uglify = composer(uglifyEs, console)

gulp.task('build', () => {
  const sink = clone.sink()

  return browserify('src/index.js')
    .transform('babelify')
    .bundle()
    .pipe(source('magic-roundabout.js'))
    .pipe(buffer())
    .pipe(sink)
    .pipe(uglify())
    .pipe(rename('magic-roundabout.min.js'))
    .pipe(sink.tap())
    .pipe(gulp.dest('dist/'))
})

gulp.task('watch', () => {
  gulp.watch('src/**/*', ['build', 'build-example'])
  gulp.watch('example/{*.html,*.css,src/*.js}', ['build-example'])
})

gulp.task('build-example', () => {
  const sink = clone.sink()

  return browserify('example/src/app.js')
    .transform('babelify')
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sink)
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(sink.tap())
    .pipe(gulp.dest('example/'))
})
