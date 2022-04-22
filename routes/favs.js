const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { validateFields } = require('../middlewares/validate-fields.js');
const { isAuthenticated } = require('../middlewares/auth');
const { getFavs, createFavs, updateFavs, deleteFavs } = require("../controllers/favs");

router.get('/', isAuthenticated, getFavs);

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        validateFields
    ],
    isAuthenticated, 
    createFavs
);

router.put('/:id', isAuthenticated, updateFavs);

router.delete('/:id', isAuthenticated, deleteFavs);

module.exports = router;