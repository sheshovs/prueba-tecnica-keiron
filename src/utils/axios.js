import axios from "axios";

const clienteAxios = axios.create({
	baseURL: process.env.REACT_APP_POKEAPI_BASE_URL,
});

export default clienteAxios;
