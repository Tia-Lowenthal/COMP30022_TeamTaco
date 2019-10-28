/* This file defines post, get, and delete api requests for images
- Written by Tia Lowenthal for COMP30022 IT Project*/

const router = require('express').Router();
let Images = require('../models/images.model');
const upload = require('./config/imageConfig.js');


const singleUpload = upload.single('images');

// get all image objects
router.route('/').get((req, res) => {
    Images.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// get a single image
router.route('/:itemId').get((req, res) => {
  Images.find({ "itemId": req.params.itemId })
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
});

// upload a single image
router.route('/add').post(singleUpload, (req, res) => {
  console.log(req.file);
  res.send(req.file.location);
});

// add image id to the database
router.route('/mongoadd').post((req, res) => {
  console.log(req.file);  
  const itemId = req.body.itemId;
  const images = req.body.images;
  
  const newImages = new Images({
      itemId,
      images
  })


    newImages.save()
        .then(() => res.json('Image added to MongoDB!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete an item's image
router.route('/:itemId').delete((req, res) => {
    Images.find({"itemId":req.params.itemId}).remove().exec()
        .then(() => res.json('Image deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;