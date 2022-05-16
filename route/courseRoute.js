const express = require('express');
const router =  express();
const courseController = require('../controller/CourseController')

router.post('/register',courseController.register)
router.patch('/update',courseController.update)
router.delete('/delete/:id',courseController.deleteCourse)
router.get('/show',courseController.showCourse)


module.exports = router