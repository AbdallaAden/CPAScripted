const postModel = require('../models/Post')
const userModel = require('../models/User')

exports.createPost = (req, res) => {

    const post = new postModel(req.body)
 console.log(req.body.content)
    //userModel.push(post)
    post.save()
        .then((newPost) => {
            // push the new post's ID to the user's posts array
            userModel.findByIdAndUpdate(req.body.userId, { $push: { posts: newPost._id } })
            .then(() => {
                res.json({
                    message: "The post was successfully created and pushed to the user",
                    data: newPost
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Failed to push post to user",
                    error: err
                })
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
exports.getPostsByUser = async (req, res) => {
    const userId = req.params.id;
    //console.log(userId);
    try {
      const userPosts = await postModel.find({ user_id: userId });
      if (userPosts.length > 0) {
        res.json({
          message: `Posts by user with id ${userId}`,
          data: userPosts,
        });
      } else {
        res.status(404).json({
          message: `No posts found for user with id ${userId}`,
        });
      }
    } catch (err) {
      res.status(404).json({
        message: err,
      });
    }

//     userModel.findOne({ _id: userId })
//         .populate('posts')
//         .then(user => {
//             res.json({
//                 message: "List of all posts for user",
//                 data: user.posts,
//                 totalposts: user.posts.length
//             })
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: err
//             })
//         })
//     console.log('get posts by user')
// 

exports.getByUsername= async (req, res) => {
   // const userId = req.params.id;
    try {

         const user = await userModel.findOne({ username: req.params.username });
        
       const posts = await postModel.find({ userId: user._id });
        
         res.status(200).json(posts);
        
         } catch (err) {
        
         res.status(500).json(err);
        
         }
        
    };

}