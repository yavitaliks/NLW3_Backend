import Imagens from '../Models/Imagens'

export default {
    render(imagem: Imagens){
        return{
            id: imagem.id,
            url: `http://192.168.1.116:3333/ImagensOrf/${imagem.patch}`
        };
    },

    renderMany(images: Imagens[]){
        return images.map(imagem => this.render(imagem));
    }
};