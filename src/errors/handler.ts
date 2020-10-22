import { ErrorRequestHandler } from 'express';
import {ValidationError} from 'yup';

interface ValidationErrors{
    [key: string]: string[];
};

//Capturar erros e devolver pro cliente resposta personalizada.
const errorHandler: ErrorRequestHandler = (error, request, response, next) =>{

    //Verificar si erro é de validação
    if(error instanceof ValidationError){
        //gerar um erro
        let errors: ValidationErrors = {};
        //Percorrer todos os campos de erros
        error.inner.forEach(err =>{
            errors[err.path] = err.errors;
        });

        //retornar erro
        return response.status(400).json({message: "Erro de validação de dados", errors});
    }

    //Mostrar erro no console
    console.error(error);

    //Resposta para cliente
     return response.status(500).json({ menssage: 'ERRO INTERNO DO SERVIDOR'})
};

export default errorHandler;