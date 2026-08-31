import Joi from 'joi';

const noteSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required()
    .max(100)
    .messages({
      'string.empty': 'title cannot be empty',
      'any.required': 'title is required',
      'string.max':'100 chars is the max limit'
    }),
  body: Joi.string()
    .trim()
    .required()
    .messages({
    'string.empty': 'body cannot be empty',
     'any.required': 'body is required'
    })
});


export default noteSchema;