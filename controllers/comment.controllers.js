const { newComment, getComment, deleteComments } = require("../services/comment.service")


//ADD A NEW COMMENT
const addComment = async (req, res) => {
    await newComment(req.body, res);
}

//GET COMMENTS
const getComments = async (req, res) => {
    await getComment(req, req.query, res)
}

//DELETE COMMENT
const deleteComment = async (req, res) => {
    await deleteComments(req.params, res);
}

module.exports = { addComment, getComments, deleteComment };