import Imagens from '../Models/Imagens'

export default {
    render(imagem: Imagens){
        return{
            id: imagem.id,
            url: `http://localhost:3333/ImagensOrf/${imagem.patch}`
        };
    },

    renderMany(images: Imagens[]){
        return images.map(imagem => this.render(imagem));
    }
};