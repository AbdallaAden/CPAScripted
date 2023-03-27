const express = require('express')
const router = express.Router()
const postService = require('../services/postService')
const auth = require('../Middleware/verifyToken')
//const userService = require('../services/UserService')


router.post("/",/*auth.auth,*/postService.createPost)
router.get("/",postService.getAllPosts)

router.get('/:id',postService.getPost)
router.get('/user/:id',postService.getPostsByUser),

router.put('/:id',postService.updatePost)
router.get('/profile/:username', postService.getByUsername)


router.delete('/:id',postService.removePost)

module.exports = router