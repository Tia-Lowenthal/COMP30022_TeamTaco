const router = require('express').Router();
let Tag = require('../models/tag.model');

router.route('/').get((req, res) => {
    Tag.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const tagId = req.body.tagId;
    const tagName = req.body.tagName;

    
    const newTag = new Tag({
        tagId,
        tagName
    })


    newTag.save()
        .then(() => res.json('Tag added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:tagId').delete((req, res) => {
    Item.findOneAndDelete({"tagId":req.params.tagId})
        .then(() => res.json('Tag deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;