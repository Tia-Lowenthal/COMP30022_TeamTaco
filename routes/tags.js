/* This file defines post, get, and delete api requests for tags
- Written by Tia Lowenthal for COMP30022 IT Project*/

const router = require('express').Router();
let Tag = require('../models/tag.model');

// get all tags
router.route('/').get((req, res) => {
    Tag.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add a tag
router.route('/add').post((req, res) => {
    const tagName = req.body.tagName;

    const newTag = new Tag({
        tagName
    })


    newTag.save()
        .then(() => res.json('Tag added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// delete a tag
router.route('/:tagName').delete((req, res) => {
    Tag.findOneAndDelete({"tagName":req.params.tagName})
        .then(() => res.json('Tag deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;