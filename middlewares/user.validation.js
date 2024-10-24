const Joi = require("joi");
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false })

//REGISTER VALIDATION
const registerValidator = Joi.object({
    userName: Joi.string().required().messages({
        'any.required': 'Username is required'
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Must be a valid email address'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    }),
    phone: Joi.string().optional(),
    bio: Joi.string().optional(),
    userType: Joi.string().valid('client', 'admin').default('client'),
    profile: Joi.string().uri().default("https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg")
});

//LOGIN VALIDATION
const loginValidator = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Must be a valid email address'
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
});

//FORGET PASSWORD VALIDATION
const forgetPasswordValidator = Joi.object({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.email': 'Must be a valid email address'
    })
}).unknown(true);

//SET NEW PASSWORD VALIDATION
const setPasswordValidator = Joi.object({
    password: Joi.string().required().messages({
        'any.required': 'Password is required'
    })
}).unknown(true);

const registerValidate = validator(registerValidator);
const loginValidate = validator(loginValidator);
const forgetPasswordValidate = validator(forgetPasswordValidator);
const setPasswordValidate = validator(setPasswordValidator);

module.exports = { registerValidate, loginValidate, forgetPasswordValidate, setPasswordValidate }