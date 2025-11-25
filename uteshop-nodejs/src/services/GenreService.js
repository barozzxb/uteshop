import Genre from "../models/Genre.js";

class GenreService {
    async addGenre(dto) {
        try {
            if (!dto) {
                return { success: false, message: 'Data transfer error', data: null };
            }

            const genre = new Genre({
                _id: dto._id,
                name: dto.name,
                description: dto.description
            });

            await genre.save();
            return { success: true, message: 'Created genre', data: genre._id };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Unexpected error', data: null };
        }
    }
}

export default GenreService;