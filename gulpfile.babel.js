import gulp from 'gulp'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import uglifyEs from 'uglify-es'
import composer from 'gulp-uglify/composer'
import clone from 'gulp-clone'
import rename from 'gulp-rename'

const uglify = composer(uglifyEs, console)
const sink = clone.sink()

gulp.task('build', () => {
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
