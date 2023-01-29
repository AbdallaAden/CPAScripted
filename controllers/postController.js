const express = require('express')
const router = express.Router()
const postService = require('../services/postService')


router.post("/",postService.createPost)
router.get("/",postService.getAllPosts)

router.get('/:id',postService.getPost)

router.put('/:id',postService.updatePost)



router.delete('/:id',postService.removePost)

module.exports = router