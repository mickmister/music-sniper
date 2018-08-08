require('dotenv').config()
const gulp = require('gulp')

require('./scripts/gulp/s3-deploy-tasks')
require('./scripts/gulp/parcel-tasks')
require('./scripts/gulp/mocha-tasks')

gulp.task('display-env', () => {
  console.log(process.env.PRODENV)
})

gulp.task('print-env', () => {
  console.log(process.env.CUSTOM_VARS)
  const ls = process.env.CUSTOM_VARS.split(',')
  const customVars = {}
  ls.forEach(v => {
    customVars[v.split('=')[0]] = v.split('=')[1]
  })
  console.log(customVars)
})

gulp.task('create-snapshot', () => {
  const params = {
    DBInstanceIdentifier: 'STRING_VALUE',
    DBSnapshotIdentifier: 'STRING_VALUE',
  }
  rds.createDBSnapshot(params, (err, data) => {
    if (err) {
      console.log(err, err.stack)
    }
    else {
      console.log(data)
    }
  });
})
