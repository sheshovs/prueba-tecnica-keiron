import { GET_ALL_POKEMON, SET_CURRENT_POKEMON } from "./../../types/index";

// eslint-disable-next-line
export default (state, action) => {
	switch (action.type) {
		case GET_ALL_POKEMON:
			return {
				...state,
				allPokemon: action.payload,
			};
		case SET_CURRENT_POKEMON:
			return {
				...state,
				currentPokemon: action.payload,
			};
		default:
			return state;
	}
};
