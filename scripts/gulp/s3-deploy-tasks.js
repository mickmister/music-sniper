const fs = require('fs')
const gulp = require('gulp')
const s3 = require('gulp-s3')
const getCreds = require('./get-s3-creds')

const creds = getCreds.creds

const buildDir = process.env.BUILD_DIR

gulp.task('check-s3-env-vars', () => {
  if (!buildDir) {
    console.error('Missing WEBPACK_BUILD_DESTINATION env variable')
    process.exit(1)
  }
  if (!fs.existsSync(buildDir)) {
    console.error(`Build dir does not exist: ${buildDir}`)
    process.exit(1)
  }
  getCreds.checkMissing(creds)
})

gulp.task('deploy', () => gulp
  .src(`${buildDir}/*`)
  .pipe(s3(creds))
)
