//require express, express router and bcrypt as shown in lecture code
const express = require("express");
const router = express.Router();
const Data = require('./../data');
const userData = Data.userData;
const helper = require('./../helpers')


router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    const {
      username
    } = req.session;
    // console.log("username = ", username)
    if (username) {
      res.redirect('/protected');
    } else {
      res.render('userLogin');
    }
  })

// router
//   .route('/set')
//   .get(async (req, res) => {
//     //code here for GET
//     req.session.name = 'pw';
//     res.send('aaa')
//   })

// router
//   .route('/get')
//   .get(async (req, res) => {
//     //code here for GET
//     console.log("session = ", req.session.name)
//     res.send(req.session.name)
//   })

router
  .route('/register')
  .get(async (req, res) => {
    //code here for GET
    const {
      username
    } = req.session;
    // console.log("username = ", username)
    if (username) {
      res.redirect('/protected');
    } else {
      res.render('userRegister');
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const {
      usernameInput,
      passwordInput
    } = req.body;
    try {
      helper.checkUserEmpty(usernameInput,passwordInput);
      const result = await userData.createUser(usernameInput, passwordInput);
      // console.log("result2 = ", result)
      if (result.insertedUser) {
        res.redirect('/');
      }
    } catch (error) {
      console.log("error = ", error)
      const {
        message
      } = error;
      if (message == 'Internal Server Error!') {
        res.status(500).render('userRegister', {
          message
        });
      } else {
        res.status(400).render('userRegister', {
          message
        });
      }

    }
  })

router
  .route('/login')
  .post(async (req, res) => {
    //code here for POST
    const {
      usernameInput,
      passwordInput
    } = req.body;
    try {
      const result = await userData.checkUser(usernameInput, passwordInput);
      // console.log("result2 = ", result)
      if (result.authenticatedUser) {
        req.session.username = usernameInput;
        res.redirect('/');
      }
    } catch (error) {
      console.log("error = ", error)
      const {
        message
      } = error;
      if (message == 'Internal Server Error!') {
        res.status(500).render('userLogin', {
          message
        });
      } else {
        res.status(400).render('userLogin', {
          message
        });
      }

    }
  })

router
  .route('/protected')
  .get((req, res, next) => {
    const {
      username
    } = req.session;
    if (!username) {
      res.status(403).render('forbiddenAccess');
    } else {
      next();
    }
  }, async (req, res) => {
    //code here for GET
    const {
      username
    } = req.session;
    res.render('private', {
      username,
      dateTime: new Date().toUTCString()
    });
  })

router
  .route('/logout')
  .get(async (req, res) => {
    //code here for GET
    req.session.destroy();
    res.render('logout');
  })

module.exports = router;