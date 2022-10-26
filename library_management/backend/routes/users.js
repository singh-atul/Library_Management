const { Router } = require('express');
const jwt = require('jsonwebtoken');

const usersController = require('../controllers/auth');
const author = require('../models/author');

const router = Router();

router.post('/signup', async (req, res) => {
    const { body } = req;
    
    const result = await usersController.signup(body);

    if(!result.error) {
        return jwt.sign(
            {user: result.user},
            process.env.JWT_SECRET,

            (err, token) => {
                if(err) {
                    return res.status(500).json({
                        message: 'Something went wrong',
                        error: true
                    });
                } else {
                    result.token = token;
                    return res.status(201).json(result);
                }
            }
        );
    } else {
        return res.status(400).json(result);
    }
});

router.post('/login', async (req, res) => {
    const { body: { email, password }} = req;

    const result = await usersController.login({email, password});

    if(!result.error) {
        return res.status(200).json(result);
    }
    
    return;
});

module.exports = router;