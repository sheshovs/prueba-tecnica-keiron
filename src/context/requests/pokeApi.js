import clienteAxios from "./../../utils/axios";

const pokemons = "/pokemon?limit=25";

const pokeApi = {
	GetPokemons: async () => {
		try {
			const resp = await clienteAxios.get(pokemons);
			return resp;
		} catch (error) {
			return error.response;
		}
	},
};

export default pokeApi;
