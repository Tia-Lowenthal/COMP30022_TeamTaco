const router = require('express').Router();
let User = require('../models/user.model');


router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
    const userId = req.body.userId;
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const dob = req.body.dob;
    const userType = req.body.userType;

    const newUser = new User({
        userId, 
        email, 
        password, 
        firstname, 
        lastname, 
        dob, 
        userType
    })

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:userId').get((req, res) => {
    User.find({"userId":req.params.userId})
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:userId').delete((req, res) => {
    User.findOneAndDelete({"userId":req.params.userId})
        .then(() => res.json('User deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/update/:userId').post((req, res) => {
    User.findOne({"userId":req.params.userId}, {'new':true})
        .then(user => {
            user.userId = req.body.userId;
            user.email = req.body.email;
            user.password = req.body.password;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.dob = req.body.dob;
            user.userType = req.body.userType;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;