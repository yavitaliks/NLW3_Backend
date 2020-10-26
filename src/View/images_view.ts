import Imagens from '../Models/Imagens'

export default {
    render(imagem: Imagens){
        return{
            id: imagem.id,
            url: `http://200.200.200.252:3333/ImagensOrf/${imagem.patch}`
        };
    },

    renderMany(images: Imagens[]){
        return images.map(imagem => this.render(imagem));
    }
};