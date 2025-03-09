import { Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import Topic from '../models/Topic';

export const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categoryId = req.params.id;
    
    await Topic.deleteMany({ category: categoryId });
    
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }
    
    res.json({ message: 'Category and its associated topics deleted successfully' });
  } catch (error) {
    next(error);
  }
};
