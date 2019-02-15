const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An Error occured')
                // return next(error);

                return res.status(403).send("Unable to login, please check your username and password");
            }
            req.login(user, { session: false }, async (error) => {
                if (error) {
                    return next(error);
                }

                const body = { _id: user._id, email: user.email };
                //Sign the JWT token and populate the payload with the user email and id

                const token = jwt.sign({ user: body }, 'top_secret');
                //Send back the token to the user

                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;