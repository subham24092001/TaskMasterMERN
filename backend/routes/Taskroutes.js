const express = require('express')
const router = express.Router()
const {getTasks,saveTask,updateTask,deleteTask,signupUser,loginUser} = require('../controllers/TaskControllers.js')

router.get('/get',getTasks)
router.post('/save',saveTask)
router.put('/update/:id',updateTask)
router.delete('/delete/:id',deleteTask)
// login and sign up routes
router.post('/login',loginUser)
router.post('/signup',signupUser)

module.exports = router