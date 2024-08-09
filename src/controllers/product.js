import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const data = await Product.create(req.body);
    console.log(data);
    const updateCategory = await Category.findByIdAndUpdate(
      req.body.category,
      { $push: { products: data._id } },
      { new: true }
    );
    if (data && updateCategory) {
      return res.status(201).json({
        success: true,
        data,
        message: "Create product successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const data = await Product.find().populate("categoryId").exec();
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Get products successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const data = await Product.findById(req.params.id).populate("category");
    if (data) {
      return res.status(200).json({
        success: true,
        data,
        message: "Get product detail successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const removeProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      data,
      message: "Remove product successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductById = async (req, res, next) => {
  try {
    const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data,
      message: "Update product successfully",
    });
  } catch (error) {
    next(error);
  }
};
