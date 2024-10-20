import { Router } from 'express';
import Cart from '../models/Cart.js';
import productModel from '../models/product.model.js';

const router = Router();

// nuevo carrito vacío
router.post('/', async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).send({ status: 'success', message: 'Carrito creado con éxito', cartId: newCart._id });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al crear el carrito', error });
    }
});

// renderizar carrito
router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await Cart.findById(cid).populate('products.product').lean();

        if (!cart) return res.status(404).send({ status: 'error', message: 'Carrito no encontrado' });

        res.render('cart', { cart });
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'Error al cargar el carrito', error });
    }
});

// agregar un producto
router.post('/:cartId/products/:productId', async (req, res) => {
    try {
        const { cartId, productId } = req.params;

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        cart.products.push({ product: productId, quantity: 1 });
        await cart.save();

        return res.status(200).json({ status: 'success', message: 'Producto agregado al carrito' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error interno del servidor', error: error.message });
    }
});

// eliminar un producto
router.delete('/:cartId/products/:productId', async (req, res) => {
    const { cartId, productId } = req.params;

    try {
        const cart = await Cart.findOneAndUpdate(
            { _id: cartId },
            { $pull: { products: { product: productId } } },
            { new: true }
        );

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        return res.json({ status: 'success', message: 'Producto eliminado del carrito' });
    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        return res.status(500).json({ status: 'error', message: 'Error interno del servidor', error });
    }
});

export default router;
