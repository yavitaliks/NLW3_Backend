import Orphanage from '../Models/Orphanate'
import imagemView from '../View/images_view'

export default {
    render(orphanage: Orphanage){
        return{
            id: orphanage.id,
            name: orphanage.name,
            latitude: orphanage.latitude,
            longitude: orphanage.longitude,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_day_weekends: orphanage.open_day_weekends,
            images: imagemView.renderMany(orphanage.images),
        };
    },

    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
};