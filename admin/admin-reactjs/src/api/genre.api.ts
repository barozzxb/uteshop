import axios from "./axios";

export interface GenrePayload {
    _id: string;
    name: string;
    description?: string;
}

export const getGenres = () =>
    axios.get("/admin/genres");

export const createGenre = (data: GenrePayload) =>
    axios.post("/admin/genres", data);

export const updateGenre = (id: string, data: GenrePayload) =>
    axios.put(`/admin/genres/${id}`, data);

export const deleteGenre = (id: string) =>
    axios.delete(`/admin/genres/${id}`);
