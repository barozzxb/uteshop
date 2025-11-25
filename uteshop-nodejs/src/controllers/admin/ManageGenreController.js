import GenreService from "../../services/GenreService.js";

const genreSer = new GenreService();

class ManageGenreController {
    async addGenre(req, res) {
        try {
            const dto = {
                _id: req.body._id,
                name: req.body.name,
                description: req.body.description
            };

            const result = await genreSer.addGenre(dto);
            if (!result.success) {
                return res.status(400).json(result);
            }
            return res.status(201).json(result);
        } catch (error) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Server error', data: null });
        };
    }
}

export default ManageGenreController;