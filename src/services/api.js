import axios from 'axios';

//URL filmes cataz: https://api.themoviedb.org/3/movie/now_playing ?api_key=6d11267f70ded103f665c42aea108a0d&language=pt-BR&page=1

export const key = '6d11267f70ded103f665c42aea108a0d';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;