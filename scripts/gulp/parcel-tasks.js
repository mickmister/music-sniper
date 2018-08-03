const gulp = require('gulp')
const parcel = require('gulp-parcel')

const assetHost = process.env.ASSET_HOST

gulp.task('rebuild-node-sass', () => require('rebuild-node-sass')) /* eslint-disable-line global-require */

gulp.task('parcel', (done) => {
  gulp.src('src/index.html', {read: false})
    .pipe(parcel({outDir: 'build', publicURL: assetHost}))
    .on('error', (error) => {
      done(error)
    })
    .pipe(gulp.dest('build'))
})

gulp.task('build', gulp.series('rebuild-node-sass', 'parcel'))
