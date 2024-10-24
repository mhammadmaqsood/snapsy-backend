const Joi = require("joi");
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

//CREATE POST VALIDATOR
const postValidationSchema = Joi.object({
    userId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
    caption: Joi.string().allow(null, '').max(500),
    media: Joi.array().items(Joi.string().uri()).min(1).required(),
    hashTags: Joi.array().items(Joi.string().max(30)),
    location: Joi.string().max(100).allow(null, ''),
    createdAt: Joi.date().default(Date.now),
});

const createPostValidate = validator(postValidationSchema);

module.exports = { createPostValidate };