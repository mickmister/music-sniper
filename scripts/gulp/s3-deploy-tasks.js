const fs = require('fs')

const gulp = require('gulp')
const cloudfront = require('gulp-cloudfront-invalidate')
const s3 = require('gulp-s3')

const getCreds = require('./get-s3-creds')

const creds = getCreds.creds

const buildDir = process.env.BUILD_DIR

gulp.task('check-s3-env-vars', () => {
    if (!buildDir) {
        console.error('Missing BUILD_DIR env variable')
        process.exit(1)
    }
    if (!fs.existsSync(buildDir)) {
        console.error(`Build dir does not exist: ${buildDir}`)
        process.exit(1)
    }
    getCreds.checkMissing(creds)
})

const options = {
    headers: {
        'Cache-Control': 'no-cache',
    },
}

gulp.task('deploy', gulp.parallel('deploy-index', 'deploy-assets'))

gulp.task('deploy-index', () => {
    return gulp.src(`${buildDir}/index.html`).
        pipe(s3(creds, options))
})

gulp.task('deploy-assets', () => {
    return gulp.src([`${buildDir}/*`, `!${buildDir}/index.html`]).
        pipe(s3(creds))
})

gulp.task('deploy-and-invalidate', gulp.series('deploy'), () => gulp.
    src(`${buildDir}/index.html`).
    pipe(cloudfront({...creds, paths: ['/', '/index.html']}))
)
