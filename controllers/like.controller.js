const { likePost, unlikePost, getLikesForPost } = require("../services/like.service");


//ADD NEW LIKE
const addLike = async (req, res) => {
    await likePost(req.body, res);
}

//UNLIKE POST
const unlike = async (req, res) => {
    await unlikePost(req.body, res);
}

//GET ALL LIKES FOR A SPECIFIC POST
const getLikes = async (req, res) => {
    await getLikesForPost(req.params, res);
}

module.exports = { addLike, unlike, getLikes };