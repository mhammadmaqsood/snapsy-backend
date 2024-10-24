const { createNewPost, updatePostContent, getPosts, deletePostContent } = require("../services/post.service")


//CREATE POST CONTROLLER
const createPost = async (req, res) => {
    await createNewPost(req.body, res);
}

//UPDATE POST CONTROLLER
const updatePost = async (req, res) => {
    await updatePostContent(req.params.id, req.body, res);
}

//GET ALL POSTS CONTROLLER
const getAllPosts = async (req, res) => {
    await getPosts(req, res)
}

//DELETE POST CONTROLLER
const deletePost = async (req, res) => {
    await deletePostContent(req.params.id, res)
}

module.exports = { createPost, updatePost, getAllPosts, deletePost };