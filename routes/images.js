const router = require('express').Router();
let Images = require('../models/images.model');
const upload = require('./config/imageConfig.js');


const singleUpload = upload.single('images');


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


router.route('/add').post(singleUpload, (req, res) => {
  console.log(req.file);
  res.send({'imageUrl': req.file.location});
});


router.route('/:itemId').delete((req, res) => {
    Images.find({"itemId":req.params.itemId}).remove().exec()
        .then(() => res.json('Image deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;