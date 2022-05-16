const express = require('express');
const router =  express();
const studentController = require('../controller/studentController')

router.post('/register',studentController.register);
router.post('/login',studentController.login);
router.patch('/update',studentController.update);
router.delete('/delete',studentController.deleteStudent);
router.get('/show',studentController.show);
router.post('/changePassword',studentController.changePassword);


module.exports = router