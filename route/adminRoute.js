const express = require('express')
const router = express.Router();
const adminController = require('../controller/adminController')

router.post('/register',adminController.register);
router.post('/login',adminController.login);
router.patch('/update',adminController.update);
router.delete('/delete/:id',adminController.deleteUser)


module.exports = router
