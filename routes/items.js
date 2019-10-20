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
    const category = req.body.category;
    const subCategory = req.body.subCategory;
    const length = req.body.length;
    const width = req.body.width;
    const height = req.body.height;
    const weight = req.body.weight;
    const title = req.body.title;
    const description = req.body.description;
    const condition = req.body.condition;
    const currentLocation = req.body.currentLocation;
    const needLicense = req.body.needLicense;
    const saleStatus = req.body.saleStatus;
    const displayStatus = req.body.displayStatus;
    const accessRights = req.body.accessRights;
    const estimatedValue = req.body.estimatedValue;
    const estimatedValueCurrency = req.body.estimatedValueCurrency;
    const valuer = req.body.valuer;
    const insuredValue = req.body.insuredValue;
    const insurer = req.body.insurer;
    const certifiedAuthentic = req.body.certifiedAuthentic;
    const placeOfOrigin = req.body.placeOfOrigin;
    const yearOfOrigin = req.body.yearOfOrigin;
    const originalPrice = req.body.originalPrice;
    const originalPriceCurrency = req.body.originalPriceCurrency;
    const dateAcquired = req.body.dateAcquired;
    const history = req.body.history;
    const owner = req.body.owner;
    const tags = req.body.tags;
    const images = req.body.images;
    
    const newItem = new Item({
        itemId,
        userId, 
        category,
        subCategory,
        length,
        width,
        height,
        weight,
        title,
        description,
        condition,
        currentLocation,
        needLicense,
        saleStatus,
        displayStatus,
        accessRights,
        estimatedValue,
        estimatedValueCurrency,
        valuer,
        insuredValue,
        insurer,
        certifiedAuthentic,
        placeOfOrigin,
        yearOfOrigin,
        originalPrice,
        originalPriceCurrency,
        dateAcquired,
        history,
        owner,
        tags,
        images
    })


    newItem.save()
        .then(() => res.json('Item added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:itemId').get((req, res) => {
    Item.find({"itemId":req.params.itemId})
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:itemId').delete((req, res) => {
    Item.findOneAndDelete({"itemId":req.params.itemId})
        .then(() => res.json('Item deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:itemId').post((req, res) => {
    Item.findOne({"itemId":req.params.itemId}, {'new':true})
        .then(item => {
            item.itemId = req.body.itemId;
            item.userId = req.body.userId;
            item.category = req.body.category;
            item.subCategory = req.body.subCategory;
            item.length = req.body.length;
            item.width = req.body.width;
            item.height = req.body.height;
            item.weight = req.body.weight;
            item.title = req.body.title;
            item.description = req.body.description;
            item.condition = req.body.condition;
            item.currentLocation = req.body.currentLocation;
            item.needLicense = req.body.needLicense;
            item.saleStatus = req.body.saleStatus;
            item.displayStatus = req.body.displayStatus;
            item.accessRights = req.body.accessRights;
            item.estimatedValue = req.body.estimatedValue;
            item.estimatedValueCurrency = req.body.estimatedValueCurrency;
            item.valuer = req.body.valuer;
            item.insuredValue = req.body.insuredValue;
            item.insurer = req.body.insurer;
            item.certifiedAuthentic = req.body.certifiedAuthentic;
            item.placeOfOrigin = req.body.placeOfOrigin;
            item.yearOfOrigin = req.body.yearOfOrigin;
            item.originalPrice = req.body.originalPrice;
            item.originalPriceCurrency = req.body.originalPriceCurrency;
            item.dateAcquired = req.body.dateAcquired;
            item.history = req.body.history;
            item.owner = req.body.owner;
            item.tags = req.body.tags;

            item.save()
                .then(() => res.json('Item updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;