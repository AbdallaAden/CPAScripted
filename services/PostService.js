const postModel = require('../models/Post')

exports.createPost = (req, res) => {

    const post = new postModel(req.body)
// console.log(post)
    post.save()
        .then((newpost) => {
            res.json({
                message: "The post was successfully created",
                data: newpost
            })
        })
        .catch(err => {
            //console.log('error in create post')
            res.status(500).json({
               message: err
            })

        })
}

exports.removePost = (req, res) => {
    postModel.findByIdAndRemove(req.params.id)
        .then(Updatedpost => {

            if (Updatedpost) {
                res.json({
                    message: `post with id ${req.params.id} successfully deleted`,
                    data: Updatedpost
                })
            } else {
                res.status(404).json({
                    message: `No post with id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })
}

exports.getAllPosts = (req, res) => {
    postModel.find()
        .then(posts => {
            res.json({
                message: "List of all the posts",
                data: posts,
                totalposts: posts.length
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })

        })
}

exports.getPost = (req, res) => {
    postModel.findById(req.params.id)
        .then(post => {

            if (post) {
                res.json({
                    message: `post with id ${req.params.id}`,
                    data: post
                })
            } else {
                res.status(404).json({
                    message: `No post with id ${req.params.id}`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })

}

exports.updatePost = (req, res) => {
    postModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(Updatedpost => {

            if (Updatedpost) {
                res.json({
                    message: `post with id ${req.params.id} successfully updated`,
                    data: Updatedpost
                })
            } else {
                res.status(404).json({
                    message: `No post with id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })
}