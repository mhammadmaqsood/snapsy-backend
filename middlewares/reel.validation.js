const Joi = require("joi");
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

const reelValidationSchema = Joi.object({
    media: Joi.string().uri().required(),
    caption: Joi.string().max(500).optional(),
    hashtags: Joi.array().items(Joi.string()).optional()
});

const reelValidate = validator(reelValidationSchema);
module.exports = { reelValidate };