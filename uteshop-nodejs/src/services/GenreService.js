import Genre from '../models/Genre.js';
import ApiError from '../utils/ApiError.js';

class GenreService {
    async addGenre(dto) {
        if (!dto) {
            throw new ApiError(400, 'Invalid genre data');
        }

        const exists = await Genre.findById(dto._id);
        if (exists) {
            throw new ApiError(400, 'Genre already exists');
        }

        const genre = await Genre.create({
            _id: dto._id,
            name: dto.name,
            description: dto.description,
        });

        return genre._id;
    }
}

export default new GenreService();
