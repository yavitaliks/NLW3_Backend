import {Request, Response} from 'express'
import {getRepository} from 'typeorm';
import * as Yup from 'yup';
import orphanageView from '../View/orphanagem_view'


import Orphanate from '../Models/Orphanate';

export default{
    //Listar Orfanatos.
    async index(request: Request, response: Response){
        const orphanageRepository = getRepository(Orphanate);
        const orphanages = await orphanageRepository.find({
            relations: ['images']
        });
        return response.json(orphanageView.renderMany(orphanages));
    },

    //Listar detalhes do orphanato (unico)
    async show(request: Request, response: Response){
        const {id} = request.params;
        const orphanageRepository = getRepository(Orphanate);
        const orphanage = await orphanageRepository.findOneOrFail(id,{
            relations: ['images']
        })
        return response.json(orphanageView.render(orphanage));
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

        //Inserção de imagens 
        const images = requestImagens.map(image => {
            return {patch: image.filename}
        })
        
        const data ={
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_day_weekends: open_day_weekends === "true",
            images
        }

        //Eschema de validação de dados
        const schema = Yup.object().shape({
            //Ex: nome é STRING e é obrigatorio
            name: Yup.string().required("Nome obrigatori"),
            latitude: Yup.number().required("Latitude é obrigatorio"),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_day_weekends: Yup.boolean().required(),
            images: Yup.array(Yup.object().shape({
                patch: Yup.string().required(),
            }))
        })

        //Validação de dados
        await schema.validate(data, {
            abortEarly: false,
        })

        const orphanage = orphanageRepository.create(data);

        //Aguarda incerção de dados
        await orphanageRepository.save(orphanage);
        //Retorna codigo 201 e dados do cadastrados
        return response.status(201).json(orphanage)
    }

}