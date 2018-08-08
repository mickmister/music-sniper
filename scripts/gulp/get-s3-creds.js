const env = process.env

const creds = {
  IAM_ACCESS_KEY_ID: env.S3_IAM_ACCESS_KEY_ID,
  IAM_SECRET_ACCESS_KEY: env.S3_IAM_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME: env.S3_BUCKET_NAME,
  AWS_REGION: env.AWS_REGION,
  CLOUDFRONT_DISTRIBUTION_ID: env.CLOUDFRONT_DISTRIBUTION_ID,
}

module.exports.checkMissing = (allCreds) => {
  const missing = []
  Object.keys(allCreds).forEach(key => {
    if (!allCreds[key]) {
      missing.push(key)
    }
  })
  if (missing.length) {
    console.error('Missing ENV variables:')
    missing.forEach(elem => console.error(elem))
    console.error('Aborting deploy')
    process.exit(1)
  }
}

module.exports.creds = {
  key: creds.IAM_ACCESS_KEY_ID,
  accessKeyId: creds.IAM_ACCESS_KEY_ID,
  secret: creds.IAM_SECRET_ACCESS_KEY,
  secretAccessKey: creds.IAM_SECRET_ACCESS_KEY,
  bucket: creds.S3_BUCKET_NAME,
  region: creds.AWS_REGION,
  distribution: creds.CLOUDFRONT_DISTRIBUTION_ID,
  distributionId: creds.CLOUDFRONT_DISTRIBUTION_ID,
}
