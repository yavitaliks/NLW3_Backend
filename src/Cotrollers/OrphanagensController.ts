import {Request, Response} from 'express'
import {getRepository} from 'typeorm';
import Orphanate from '../Models/Orphanate';

export default{
    //Listar Orfanatos.
    async index(request: Request, response: Response){
        const orphanageRepository = getRepository(Orphanate);
        const orphanage = await orphanageRepository.find();
        return response.json(orphanage);
    },
    //Listar detalhes do orphanato (unico)
    async show(request: Request, response: Response){
        const {id} = request.params;
        const orphanageRepository = getRepository(Orphanate);
        const orphanage = await orphanageRepository.findOneOrFail(id)
        return response.json(orphanage);
    },

    //Criar novo Orfanato.
    async create(request: Request, response: Response){

        console.log(request.files);

        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_day_weekends
        } = request.body
    
        const orphanageRepository  = getRepository(Orphanate);
        
        const requestImagens = request.files as Express.Multer.File[];

        const images = requestImagens.map(image => {
            return {patch: image.filename}
        })

        const orphanage = orphanageRepository.create({
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_day_weekends,
            images
        });

        await orphanageRepository.save(orphanage);

        return response.status(201).json(orphanage)
    }

}