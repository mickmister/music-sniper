const gulp = require('gulp')
const parcel = require('gulp-parcel')

const assetHost = process.env.ASSET_HOST
const buildDir = process.env.BUILD_DIR

gulp.task('rebuild-node-sass', () => require('rebuild-node-sass')) /* eslint-disable-line global-require */

gulp.task('parcel', ['rebuild-node-sass'], (done) => {
  gulp.src('src/index.html', {read: false})
    .pipe(parcel({outDir: 'build', publicURL: assetHost}))
    .on('error', (error) => {
      done(error)
    })
    .pipe(gulp.dest(buildDir))
})

gulp.task('build', ['parcel'])
