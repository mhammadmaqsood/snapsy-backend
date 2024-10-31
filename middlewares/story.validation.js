const Joi = require("joi");
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

const storyValidationSchema = Joi.object({
    media: Joi.string().uri().required(),
    caption: Joi.string().max(500).optional(),
    hashtags: Joi.array().items(Joi.string()).optional()
});

const storyValidate = validator(storyValidationSchema);
module.exports = { storyValidate };