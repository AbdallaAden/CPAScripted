const commentModel = require('../models/Comment')

exports.createComment = (req, res) => {

    const comment = new commentModel(req.body)
// console.log(comment)
    comment.save()
        .then((newComment) => {
            res.json({
                message: "The comment was successfully created",
                data: newComment
            })
        })
        .catch(err => {
            //console.log('error in create comment')
            res.status(500).json({
               message: err
            })

        })
}

exports.removeComment = (req, res) => {
    commentModel.findByIdAndRemove(req.params.id)
        .then(RemovedComment => {

            if (RemovedComment) {
                res.json({
                    message: `comment with id ${req.params.id} successfully deleted`,
                    data: RemovedComment
                })
            } else {
                res.status(404).json({
                    message: `No comment with id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })
}

exports.getAllComments = (req, res) => {
    commentModel.find()
        .then(comments => {
            res.json({
                message: "List of all the comments",
                data: comments,
                totalcomments: comments.length
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })

        })
}

exports.getComment = (req, res) => {
    commentModel.findById(req.params.id)
        .then(comment => {

            if (comment) {
                res.json({
                    message: `comment with id ${req.params.id}`,
                    data: comment
                })
            } else {
                res.status(404).json({
                    message: `No comment with id ${req.params.id}`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })

}

exports.updateComment = (req, res) => {
    commentModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(UpdatedComment => {

            if (UpdatedComment) {
                res.json({
                    message: `comment with id ${req.params.id} successfully updated`,
                    data: UpdatedComment
                })
            } else {
                res.status(404).json({
                    message: `No comment with id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })
}