const Joi = require('joi');

// Define a schema for validation
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

// Sample data to validate
const data = {
  username: 'john_doe',
  email: 'john.doe@example.com',
  password: 'Password123',
};

// Validate the data against the schema
const validationResult = schema.validate(data);

if (validationResult.error) {
  console.error(validationResult.error.details);
} else {
  console.log('Data is valid:', validationResult.value);
}
