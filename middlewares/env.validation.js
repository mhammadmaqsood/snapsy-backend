const Joi = require('joi');
require('dotenv').config();

const envSchema = Joi.object({
    PORT: Joi.number().default(8080),
    MONGO_URL: Joi.string().uri().required(),
    JWT_SECRET: Joi.string().required(),
    MY_GMAIL: Joi.string().email().required(),
    My_PASSWORD: Joi.string().min(8).required(),
    CLIENT_URL: Joi.string().uri().required()
}).unknown();

// Validate the environment variables
const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    port: envVars.PORT,
    mongoUrl: envVars.MONGO_URL,
    jwtSecret: envVars.JWT_SECRET,
    myGmail: envVars.MY_GMAIL,
    myPassword: envVars.My_PASSWORD,
    clientUrl: envVars.CLIENT_URL
};