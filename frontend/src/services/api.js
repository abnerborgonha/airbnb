//importar o axios para fazer a integraão com a api em nodeJS
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;