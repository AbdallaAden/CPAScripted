const express = require('express')
const router = express.Router()
const commentService = require('../services/commentService')


router.post("/",commentService.createComment)
router.get("/",commentService.getAllComments)

router.get('/:id',commentService.getComment)

router.put('/:id',commentService.updateComment)



router.delete('/:id',commentService.removeComment)

module.exports = router