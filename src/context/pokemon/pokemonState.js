import React, { useReducer } from "react";

import pokemonContext from "./pokemonContext";
import pokemonReducer from "./pokemonReducer";

import pokeApi from "../requests/pokeApi";
import axios from "axios";

import { GET_ALL_POKEMON, SET_CURRENT_POKEMON } from "./../../types/index";

const PokemonState = (props) => {
	const initialState = {
		allPokemon: [],
		currentPokemon: null,
	};

	const [state, dispatch] = useReducer(pokemonReducer, initialState);

	const getPokemons = async () => {
		try {
			const res = await pokeApi.GetPokemons();

			let arrayPokemon = [];
			let pokemonFullInfo = [];

			// Busco la información del pokémon en la API
			res.data.results.map(async (pokemon) => {
				const dataPokemon = await axios.get(pokemon.url);
				arrayPokemon.push(dataPokemon.data);
				if (arrayPokemon.length === 25) {
					arrayPokemon.sort((a, b) => {
						return a.id - b.id;
					});

					// Busco la información sobre la evolucion del pokémon en la API
					arrayPokemon.map(async (pokemon) => {
						const speciesPokemon = await axios.get(pokemon.species.url);

						if (pokemon.id === speciesPokemon.data.id) {
							pokemonFullInfo.push({
								pokemon: pokemon,
								species: speciesPokemon.data,
							});
						}
						if (pokemonFullInfo.length === 25) {
							pokemonFullInfo.sort((a, b) => {
								return a.pokemon.id - b.pokemon.id;
							});

							// Guardo la informacion en una variable global
							dispatch({
								type: GET_ALL_POKEMON,
								payload: pokemonFullInfo,
							});
						}
					});
				}
			});
		} catch (error) {
			console.log(error.response);
		}
	};

	const setCurrentPokemon = (id) => {
		const currentPkm = state.allPokemon.filter((pkm) => pkm.pokemon.id === id);

		if (currentPkm.length > 0) {
			dispatch({
				type: SET_CURRENT_POKEMON,
				payload: currentPkm[0].pokemon,
			});
		} else {
			dispatch({
				type: SET_CURRENT_POKEMON,
				payload: null,
			});
		}
	};

	return (
		<pokemonContext.Provider
			value={{
				allPokemon: state.allPokemon,
				currentPokemon: state.currentPokemon,
				getPokemons,
				setCurrentPokemon,
			}}
		>
			{props.children}
		</pokemonContext.Provider>
	);
};

export default PokemonState;
