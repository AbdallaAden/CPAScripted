const userModel = require('../models/User')

exports.createUser = (req, res) => {

    const user = new userModel(req.body)

    user.save()
        .then((newUser) => {
            res.json({
                message: "The User was successfully created",
                data: newUser
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })

        })
}
exports.getPostsByUser = (req, res) => {
    const userId = req.params.userId;

    userModel.findOne({ _id: userId })
        .populate('posts')
        .then(user => {
            res.json({
                message: "List of all posts for user",
                data: user.posts,
                totalposts: user.posts.length
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}


exports.removeUser = (req, res) => {
    userModel.findByIdAndRemove(req.params.id)
        .then(UpdatedUser => {

            if (UpdatedUser) {
                res.json({
                    message: `User with id ${req.params.id} successfully deleted`,
                    data: UpdatedUser
                })
            } else {
                res.status(404).json({
                    message: `No user with id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })
}

exports.getAllUsers = (req, res) => {
    userModel.find()
        .then(users => {
            res.json({
                message: "List of all the users",
                data: users,
                totalUsers: users.length
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })

        })
}

exports.getUser = (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {

            if (user) {
                res.json({
                    message: `User with id ${req.params.id}`,
                    data: user
                })
            } else {
                res.status(404).json({
                    message: `No user with id ${req.params.id}`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })

}

exports.updateUser = (req, res) => {
    userModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        .then(UpdatedUser => {

            if (UpdatedUser) {
                res.json({
                    message: `User with id ${req.params.id} successfully updated`,
                    data: UpdatedUser
                })
            } else {
                res.status(404).json({
                    message: `No user with id ${req.params.id} found`
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                message: err
            })

        })
}