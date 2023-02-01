const express = require("express");
const { getUser, addUser } = require("../controllers/userController")
const router = express.Router();

router.get('/:email', getUser);
router.post('/add', addUser);

module.exports = router;