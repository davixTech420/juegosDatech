import axios from "axios";

const baseUrl = "http://localhost:3001/";


export const registrarUser = (formData) => {
    return axios.post(`${baseUrl}users`,formData);
}

export const loginUser = (formData) => {
    return axios.get(`${baseUrl}users?email=${formData}`);
}
export const venderGame = (formData) => {
    return axios.post(`${baseUrl}games`,formData);
}

export const eliminarGame = (id) => {
    return axios.delete(`${baseUrl}games/${id}`);
}

export const actualizarGame = (id,formData) => {
    return axios.put(`${baseUrl}games/${id}`,formData);
}
export const getGames = () => {
    return axios.get(`${baseUrl}games`);
}
export const getGamesVendedor = (id) => {
    console.log(id);
    return axios.get(`${baseUrl}games?sellerId=${id}`);
}