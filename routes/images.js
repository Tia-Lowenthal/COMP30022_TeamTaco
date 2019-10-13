const router = require('express').Router();
let Images = require('../models/images.model');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  // only accept files of type jpeg, jpg, png, pdf and html
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype == 'application/pdf' || file.mimetype == 'text/html') {
    callback(null, true);
  } else {
    callback(new Error('incorrect file type'), false);
  }
};


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4// only accept images up to size 4MB
  },
  fileFilter: fileFilter
});


router.route('/').get((req, res) => {
    Images.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:itemId').get((req, res) => {
  Images.find({ "itemId": req.params.itemId })
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post(upload.single('images'), (req, res) => {
  console.log(req.file);  
  const itemId = req.body.itemId;
  const images = req.file.path;
  
  const newImages = new Images({
      itemId,
      images
  })


    newImages.save()
        .then(() => res.json('Image added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:itemId').delete((req, res) => {
    Images.find({"itemId":req.params.itemId}).remove().exec()
        .then(() => res.json('Image deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;