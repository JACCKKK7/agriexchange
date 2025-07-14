import { Request, Response } from 'express';
import { Cart } from '../models/Cart.js';
import { Product, IProduct } from '../models/Product.ts';

// Get cart for user
export const getCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to get cart' });
  }
};

// Add item to cart
export const addToCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const product = await Product.findById(productId) as IProduct | null;
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ success: false, message: 'Not enough stock available' });
    }

    product.quantity -= quantity;
    await product.save();

    const itemIndex = cart.items.findIndex((item: any) => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    cart.updatedAt = new Date();
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to add to cart' });
  }
};

// Update item quantity
export const updateCartItem = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const item = cart.items.find((item: any) => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    const product = await Product.findById(productId) as IProduct | null;
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (quantity < item.quantity) {
      const diff = item.quantity - quantity;
      product.quantity += diff;
      await product.save();
    }

    item.quantity = quantity;
    cart.updatedAt = new Date();
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update cart item' });
  }
};

// Remove item from cart
export const removeFromCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const item = cart.items.find((item: any) => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    const product = await Product.findById(productId) as IProduct | null;
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.quantity += item.quantity;
    await product.save();

    cart.items = cart.items.filter((item: any) => item.productId.toString() !== productId);
    cart.updatedAt = new Date();
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove from cart' });
  }
};

// Clear cart
export const clearCart = async (req: any, res: Response) => {
  try {
    const userId = req.user.userId;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    for (const item of cart.items) {
      const product = await Product.findById(item.productId) as IProduct | null;
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();
    res.json({ success: true, data: cart });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to clear cart' });
  }
};
