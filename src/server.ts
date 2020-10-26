import express from 'express';
import 'express-async-errors';
import "./Database/conection";
import routes from './routes';
import path from 'path';
import errorHandler from './errors/handler';
import cors from 'cors';

const app = express();

//Permitir acesso de outros dominios
app.use(cors());

//Usar dados em formato JSON
app.use(express.json())

//Usar arquivo de rotas
app.use(routes);

//Compartiilhar pasta de Imagens para exibir na tela do usuario
app.use('/ImagensOrf', express.static(path.join(__dirname, '..', 'ImagensOrf')));

//Usar erros personalizados
app.use(errorHandler);

//usar porta 3333 para server
app.listen(3333);