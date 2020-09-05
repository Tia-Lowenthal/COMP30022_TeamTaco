const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: 'FbW+plQIxgkbxE0Zw37edLmlPOJ34d16fnFu7ht7',
  accessKeyId: 'AKIAI2MTL5VUAB4TKOFA',
  region: 'ap-southeast-2'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype == 'application/pdf' || file.mimetype == 'text/html') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type!'), false);
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'image-uploads-tt',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

module.exports = upload;