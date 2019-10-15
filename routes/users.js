const router = require('express').Router();
let User = require('../models/user.model');
let UserSession = require('../models/usersession.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/signup').post((req, res) => {
    const userId = req.body.userId;
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const dob = req.body.dob;
    const userType = req.body.userType;

    if (!email) {
        return res.send({
          success: false,
          message: 'Error: Email cannot be blank.'
        });
    }

    if (!password) {
        return res.send({
          success: false,
          message: 'Error: Password cannot be blank.'
        });
    }

    if (!firstname) {
      return res.send({
        success: false,
        message: 'Error: First Name cannot be blank.'
      });
    }

    if (!lastname) {
      return res.send({
        success: false,
        message: 'Error: Last Name cannot be blank.'
      });
    }

    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
              success: false,
              message: 'Error: Server error'
            });
          } else if (previousUsers.length > 0) {
            return res.send({
              success: false,
              message: 'Error: Account already exist.'
            });
        }

        const newUser = new User({
            userId, 
            email, 
            firstname, 
            lastname, 
            dob, 
            userType
        })

        newUser.password = newUser.generateHash(password);

        newUser.save((err, user) => {
            if (err) {
              return res.send({
                success: false,
                message: 'Error: Server error'
              });
            }
            return res.send({
              success: true,
              message: 'Signed up'
            });
        });
    });
});


router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }

  User.find({
    email: email
  }, (err, users) => {
    if (err) {
      console.log('err 2:', err);
      return res.send({
        success: false,
        message: 'Error: server error'
      });
    }
    if (users.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    const user = users[0];
    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    // Otherwise correct user
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      return res.send({
        success: true,
        message: 'Valid sign in',
        token: doc._id
      });
    });
  });
});


router.route('/logout').get((req, res) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  // ?token=test
  // Verify the token is one of a kind and it's not deleted.
  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set: {
      isDeleted:true
    }
  }, null, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    return res.send({
      success: true,
      message: 'Good'
    });
  });
});

router.route('/verify').get((req, res) => {
  // Get the token
  const { query } = req;
  const { token } = query;
  // ?token=test
  // Verify the token is one of a kind and it's not deleted.
  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if (sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    } else {
      // DO ACTION
      return res.send({
        success: true,
        message: 'Good'
      });
    }
  });
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