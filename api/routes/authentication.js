const User = require('../../models/info'); // Import User Model Schema
const express = require('express')
const jwt = require('jsonwebtoken')
// const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
// const config = require('../../config/database'); // Import database configuration

module.exports = (router) => {
router.post('/login', (req, res) => {
    // Check if username was provided
    // console.log("hii");
    if (!req.body.email) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {
        // Check if username exists in database
        User.findOne({ "email": req.body.email.toLowerCase() }, (err, user) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!user) {
              res.json({ success: false, message: 'Username not found.' }); // Return error
            } else {
              const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                // const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                let payload = {subject : user._id}
                let token = jwt.sign(payload,'secretKey')
                res.json({
                  success: true,
                  message: 'Success!',
                  roles: user.role,
                  token: token,
                  user: {
                    username: user.email,
                  }
                })
                  // Return success and token to frontend
              }
            }
          }
        });
      }
    }
  });
    

  /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
  // router.use((req, res, next) => {
  //   const token = req.headers['authorization']; // Create token found in headers
  //   // Check if token was found in headers
  //   if (!token) {
  //     res.json({ success: false, message: 'No token provided' }); // Return error
  //   } else {
  //     // Verify the token is valid
  //     jwt.verify(token, config.secret, (err, decoded) => {
  //       // Check if error is expired or invalid
  //       if (err) {
  //         res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
  //       } else {
  //         req.decoded = decoded; // Create global variable to use in any request beyond
  //         next(); // Exit middleware
  //       }
  //     });
  //   }
  // });

  /* ===============================================================
     Route to get user's profile data
  =============================================================== */
  // router.get('/profile', (req, res) => {
  //   // Search for user in database
  //   User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
  //     // Check if error connecting
  //     if (err) {
  //       res.json({ success: false, message: err }); // Return error
  //     } else {
  //       // Check if user was found in database
  //       if (!user) {
  //         res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
  //       } else {
  //         res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
  //       }
  //     }
  //   });
  // });

  /* ===============================================================
     Route to get user's public profile data
  =============================================================== */
  // router.get('/publicProfile/:username', (req, res) => {
  //   // Check if username was passed in the parameters
  //   if (!req.params.username) {
  //     res.json({ success: false, message: 'No username was provided' }); // Return error message
  //   } else {
  //     // Check the database for username
  //     User.findOne({ username: req.params.username }).select('username email').exec((err, user) => {
  //       // Check if error was found
  //       if (err) {
  //         res.json({ success: false, message: 'Something went wrong.' }); // Return error message
  //       } else {
  //         // Check if user was found in the database
  //         if (!user) {
  //           res.json({ success: false, message: 'Username not found.' }); // Return error message
  //         } else {
  //           res.json({ success: true, user: user }); // Return the public user's profile data
  //         }
  //       }
  //     });
  //   }
  // });
  router.get('/login',function(req,res){
    res.send('Hello there!!!')
});
  return router; // Return router object to main index.js
}
