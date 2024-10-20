// import { Router } from 'express';
// const router = Router();

// let productos = [];

// // GET renderizar
// router.get('/', (req, res) => {
//     res.render('realTimeProducts');
// });

// // POST agregar
// router.post('/agregar', (req, res) => {
//     const { name } = req.body
//     if (name) {
//         const newProduct = { id: Date.now(), name }
//         productos.push(newProduct)

//         // evento de actualización de productos mediante WebSocket
//         req.io.emit('productsList', productos);

//         res.status(201).send({ message: 'Producto agregado correctamente', product: newProduct });
//     } else {
//         res.status(400).send({ message: 'El nombre del producto es requerido' });
//     }
// })

// // DELETE eliminar
// router.delete('/eliminar/:id', (req, res) => {
//     const productoId = parseInt(req.params.id)
//     productos = productos.filter((producto) => producto.id !== productoId)

//     req.io.emit('productsList', productos);

//     res.send({ message: 'Producto eliminado correctamente' });


// })


// export default router;
