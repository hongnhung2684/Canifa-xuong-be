import Joi from "joi";
export const productSchema = Joi.object({
  title: Joi.string().required().min(6).max(255).messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must have at least 6 characters",
    "string.max": "Title must have at most 255 characters",
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "Price must be a number",
    "number.empty": "Price cannot be empty",
    "number.min": "Price minimum value is 0",
  }),
  description: Joi.string().messages({
    "string.base": "Description must be a string",
  }),
  category: Joi.string().messages({
    "string.base": "Category must be a string",
  }),
});
