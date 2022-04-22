const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields.js');
const { validateToken } = require('../middlewares/validate-jwt.js');
const { createUser, loginUser, revalidateToken } = require('../controllers/auth.js');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must contain at least 6 characters').isLength({ min: 6 }),
        validateFields,
    ],
    createUser
);

router.post(
    '/local/login', 
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must contain at least 6 characters').isLength({ min: 6 }),
        validateFields,
    ],
    loginUser
);

router.get('/renew', validateToken, revalidateToken);

module.exports = router;