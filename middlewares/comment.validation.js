const Joi = require('joi');
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

const addCommentSchema = Joi.object({
    postId: Joi.string().optional(),
    reelId: Joi.string().optional(),
    storyId: Joi.string().optional(),
    commentText: Joi.string().required(),
}).custom((value, helpers) => {
    const { postId, reelId, storyId } = value;
    const countTargets = [postId, reelId, storyId].filter(Boolean).length;

    if (countTargets !== 1) {
        return helpers.error('any.only', { message: "Specify only one of postId, reelId, or storyId" });
    }

    return value; // Everything is valid, return the value
});

const addCommentValidate = validator(addCommentSchema);

module.exports = { addCommentValidate }
