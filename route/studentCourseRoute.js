const express = require('express');
const router =  express();
const studentCourseController = require('../controller/studentCourseController')

router.post('/register',studentCourseController.register)
router.patch('/update',studentCourseController.update)
router.delete('/delete/:id',studentCourseController.deleteUser)
router.get('/show',studentCourseController.show)


module.exports = router