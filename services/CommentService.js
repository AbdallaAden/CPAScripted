const commentModel = require('../models/Comment')
const PostModel = require('../models/Post')

/*exports.createComment = (req, res) => {

    const comment = new commentModel(req.body)
    const postId = req.params.postId;
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
}*/
exports.createComment = async (req, res) => {
  try {
    const { content, user_id, post_id, parent_id } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const comment = new commentModel({
      content,
      user_id,
      post_id,
      parent_id,
    });

    const savedComment = await comment.save();

    if (!parent_id) {
      // If the comment is not a reply to another comment, add it to the post's comment array
      await PostModel.findByIdAndUpdate(post_id, {
        $push: { comments: savedComment._id },
      });
    } else {
      // If the comment is a reply to another comment, add it to the parent comment's replies array
      await commentModel.findByIdAndUpdate(parent_id, {
        $push: { replies: savedComment._id },
      });
    }

    res.json({
      message: "The comment was successfully created",
      data: savedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the comment",
      error,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title && !content) {
      return res.status(400).json({ message: "Title or content is required" });
    }

    const post = await PostModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    res.json({
      message: "The post was successfully updated",
      data: post,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while updating the post",
      error,
    });
  }
};




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