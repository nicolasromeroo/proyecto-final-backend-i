import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import viewsRouter from './routes/views.router.js'
import dotenv from 'dotenv';
import cartsRouter from './routes/carts.router.js';
dotenv.config();

const app = express();

app.use(express.json());

const uriConexion = process.env.MONGODB_URI
mongoose.connect(uriConexion)

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', viewsRouter)
app.use('/carts', cartsRouter);

app.listen(8080, () => console.log("Escuchando en el puerto 8080"))



