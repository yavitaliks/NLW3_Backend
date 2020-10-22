import {Router} from 'express';
import multer from 'multer';
import OrphanagensController from './Cotrollers/OrphanagensController';
import uploadConfig from './Config/upload'; 

const routes = Router();
const upload = multer(uploadConfig);

//Criar novo orfanato
routes.post('/orphanats', upload.array('images'), OrphanagensController.create)
//Listar orfanatos
routes.get('/orphanats', OrphanagensController.index)
//Listar orfanatos
routes.get('/orphanages/:id', OrphanagensController.show)

export default routes;