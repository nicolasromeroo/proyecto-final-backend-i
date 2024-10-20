

// router.get('/products', async (req, res) => {
//     let { page, rows, query, sort } = req.query;

//     if (!page) page = 1
//     if (!rows) rows = 10

//     // filtro 'query'
//     let filter = query ? { category: query } : {};

//     // opciones de ordenamiento
//     let sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

//     // Paginación con filtro y opciones de ordenamiento
//     // let result = await productModel.paginate({}, { page, limit: rows, lean: true })
//     let result = await productModel.paginate(filter, { page, limit: rows, sort: sortOption, lean: true });

//     result.prevLink = result.hasPrevPage ? `http://localhost:8080/products?page=${result.prevPage}&rows=${rows}` : ''
//     result.nextLink = result.hasNextPage ? `http://localhost:8080/products?page=${result.nextPage}&rows=${rows}` : ''
//     result.isValid = !(page <= 0 || page > result.totalPages)

//     res.render('index', { products: result.docs, ...result });

//     // datos en formato json solicitado
//     // res.json({
//     //     status: 'success',
//     //     payload: result.docs,
//     //     totalPages: result.totalPages,
//     //     prevPage: result.prevPage,
//     //     nextPage: result.nextPage,
//     //     page: result.page,
//     //     hasPrevPage: result.hasPrevPage,
//     //     hasNextPage: result.hasNextPage,
//     //     prevLink: result.prevLink,
//     //     nextLink: result.nextLink
//     // });
// })
import { Router } from 'express';
import productModel from '../models/product.model.js';

const router = Router();

// paginación
router.get('/', async (req, res) => {
    let { page, rows, query, sort } = req.query;

    if (!page) page = 1;
    if (!rows) rows = 10;

    let filter = query ? { category: query } : {};

    let sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    try {
        let result = await productModel.paginate(filter, { page, limit: rows, sort: sortOption, lean: true });

        result.prevLink = result.hasPrevPage ? `/?page=${result.prevPage}&rows=${rows}` : '';
        result.nextLink = result.hasNextPage ? `/?page=${result.nextPage}&rows=${rows}` : '';
        result.isValid = !(page <= 0 || page > result.totalPages);

        res.render('index', { products: result.docs, ...result });
    } catch (error) {
        console.error('Error al cargar la página principal con productos:', error);
        res.status(500).send('Error al cargar la página principal');
    }
});

// detalle del producto
router.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await productModel.findById(pid).lean(); // Buscar el producto por ID
        if (!product) {
            return res.status(404).render('notFound', { message: 'Producto no encontrado' });
        }

        res.render('productDetail', { product });
    } catch (error) {
        res.status(500).render('error', { message: 'Error al obtener el producto', error });
    }
});

export default router;
