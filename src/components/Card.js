import React, { useContext } from "react";
import { Box, styled } from "@mui/material";
import PokemonContext from "../context/pokemon/pokemonContext";

const Card = ({ dataPkm, handleOpen }) => {
	const pokemonContext = useContext(PokemonContext);
	const { setCurrentPokemon } = pokemonContext;

	const handleClick = (id) => {
		setCurrentPokemon(id);
		handleOpen();
	};

	const handleType = (type) => {
		switch (type) {
			case "grass":
				return "#24d74e";
			case "fire":
				return "#fe4c5c";
			case "water":
				return "#82a9fc";
			case "normal":
				return "#d59cab";
			case "electric":
				return "#faff6e";
			case "poison":
				return "#a26be2";
			case "bug":
				return "#3da150";
			default:
				return "#cccccc";
		}
	};

	return (
		<CardBox onClick={() => handleClick(dataPkm.pokemon.id)}>
			<ImgBox handleType={handleType} type={dataPkm.pokemon.types[0].type.name}>
				<img
					src={dataPkm.pokemon.sprites.front_default}
					alt="Imagen del pokémon"
				/>
				<PokeID>ID: {dataPkm.pokemon.id}</PokeID>
			</ImgBox>
			<InfoBox>
				<PokeName>{dataPkm.pokemon.name}</PokeName>
				<PokeTypes>
					{dataPkm.pokemon.types.map((type) => (
						<PokeType>{type.type.name}</PokeType>
					))}
				</PokeTypes>
				{dataPkm.species.evolves_from_species !== null ? (
					<EvolvesFrom>
						Evoluciona de {dataPkm.species.evolves_from_species?.name}
					</EvolvesFrom>
				) : null}
			</InfoBox>
		</CardBox>
	);
};

export default Card;

const CardBox = styled(Box)(() => ({
	width: "300px",
	aspectRatio: "4/3",
	margin: "20px 10px",
	display: "flex",
	flexDirection: "column",
	cursor: "pointer",
	transition: "box-shadow .2s ease",
	borderRadius: "10px",

	"&:hover": {
		boxShadow: "3px 3px 10px 0 rgba(0,0,0,.4)",
	},
}));

const ImgBox = styled(Box)(({ handleType, type }) => ({
	width: "100%",
	height: "60%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	position: "relative",
	background: handleType(type),
	borderRadius: "10px 10px 0 0",
}));

const PokeID = styled(Box)(() => ({
	position: "absolute",
	left: 10,
	bottom: 5,
	background: "rgba(255,255,255,.6)",
	padding: "2px 10px",
	borderRadius: 5,
}));

const InfoBox = styled(Box)(() => ({
	width: "100%",
	height: "40%",
	background: "#ffffff",
	alignSelf: "flex-end",
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	padding: "5px 15px",
	boxSizing: "border-box",
	borderRadius: "0 0 10px 10px",
}));

const PokeName = styled("h3")(() => ({
	textTransform: "capitalize",
	margin: 0,
	marginBottom: 5,
}));

const PokeTypes = styled(Box)(() => ({
	width: "100%",
	display: "flex",
}));

const PokeType = styled(Box)(() => ({
	padding: "5px 10px",
	textTransform: "uppercase",
	fontSize: "0.7rem",
	border: "1px solid rgba(0,0,0,.2)",
	borderRadius: "10px",
	marginRight: "5px",
	marginBottom: "5px",
}));

const EvolvesFrom = styled(Box)(() => ({
	width: "100%",
	fontSize: "0.7rem",
}));
