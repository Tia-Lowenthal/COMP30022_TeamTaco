const router = require('express').Router();
let Item = require('../models/item.model');

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const itemId = req.body.itemId;
    const userId = req.body.userId;
    const subCatId = req.body.userId;
    const sizeAttributesId = req.body.sizeAttributesId;
    const title = req.body.title;
    const description = req.body.description;
    const condition = req.body.condition;
    const dateUploaded = req.body.dateUploaded;
    
    const newItem = new Item({
        itemId,
        userId, 
        subCatId,
        sizeAttributesId,
        title,
        description,
        condition,
        dateUploaded
    })

    newItem.save()
        .then(() => res.json('Item added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Item.findById(req.params.itemId)
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.itemId)
        .then(() => res.json('Item deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Item.findById(req.params.itemId)
        .then(items => {
            item.itemId = req.body.itemId;
            item.userId = req.body.userId;
            item.subCatId = req.body.userId;
            item.sizeAttributesId = req.body.sizeAttributesId;
            item.title = req.body.title;
            item.description = req.body.description;
            item.condition = req.body.condition;
            item.dateUploaded = req.body.dateUploaded;

            item.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;