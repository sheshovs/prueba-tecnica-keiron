/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { Box, styled, Modal, Fade } from "@mui/material";
import Card from "./components/Card";

//components
import SearchBar from "./components/SearchBar";

//context
import PokemonContext from "./context/pokemon/pokemonContext";

function App() {
	const [filterPkm, setFilterPkm] = useState("");
	const [arrayPkmFilter, setArrayPkmFilter] = useState([]);
	const [openModal, setOpenModal] = useState(false);

	const pokemonContext = useContext(PokemonContext);
	const { allPokemon, currentPokemon, getPokemons, setCurrentPokemon } =
		pokemonContext;

	const handleOpen = () => setOpenModal(true);
	const handleClose = () => {
		setOpenModal(false);

		setTimeout(() => {
			setCurrentPokemon();
		}, 200);
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

	useEffect(() => {
		getPokemons();
	}, []);

	useEffect(() => {
		if (filterPkm !== "") {
			setArrayPkmFilter(
				allPokemon.filter((poke) =>
					poke.pokemon.name.includes(filterPkm.toLowerCase())
				)
			);
		}
	}, [filterPkm]);

	// Contenido del modal
	const pokemonInfo = (
		<Modal open={true} onClose={handleClose}>
			<ContainerInfoPkm
				handleType={handleType}
				type={currentPokemon?.types[0].type.name}
			>
				<TitlePkm>
					#{currentPokemon?.id} - {currentPokemon?.name}
				</TitlePkm>
				<ImgsPkm>
					<TitleImg>Normal</TitleImg>
					<ImgPkm>
						<FrontPkm src={currentPokemon?.sprites.front_default} />
						<BackPkm src={currentPokemon?.sprites.back_default} />
					</ImgPkm>
					<TitleImg>Shiny</TitleImg>
					<ImgPkm>
						<ShinyFrontPkm src={currentPokemon?.sprites.front_shiny} />
						<ShinyBackPkm src={currentPokemon?.sprites.back_shiny} />
					</ImgPkm>
				</ImgsPkm>
				<InfoPkm>
					<TitleInfoPkm>Información</TitleInfoPkm>
					<TextInfo>
						<LeftSide>
							<TextInfoPkm>
								<b>Altura:</b> {currentPokemon?.height}
							</TextInfoPkm>
							<TextInfoPkm>
								<b>Peso:</b> {currentPokemon?.weight}
							</TextInfoPkm>
						</LeftSide>
						<RightSide>
							<TextInfoPkm>
								<b>Habilidades: </b>
								{currentPokemon?.abilities.map((ability) => (
									<AbilityBox>{ability.ability.name}</AbilityBox>
								))}
							</TextInfoPkm>
						</RightSide>
					</TextInfo>
				</InfoPkm>
			</ContainerInfoPkm>
		</Modal>
	);

	return (
		<>
			<Fade in={openModal}>{pokemonInfo}</Fade>

			<Container>
				<SearchBar filterPkm={filterPkm} setFilterPkm={setFilterPkm} />
				<CardsBox>
					{filterPkm !== ""
						? arrayPkmFilter?.map((poke) => {
								return (
									<Card
										key={poke.pokemon.id}
										dataPkm={poke}
										handleOpen={handleOpen}
									/>
								);
						  })
						: allPokemon?.map((poke) => {
								return (
									<Card
										key={poke.pokemon.id}
										dataPkm={poke}
										handleOpen={handleOpen}
									/>
								);
						  })}
				</CardsBox>
			</Container>
		</>
	);
}

export default App;

const Container = styled(Box)(() => ({
	width: "70%",
	minHeight: "100vh",
	display: "flex",
	flexDirection: "column",
	justifyContent: "flex-start",
	alignItems: "center",
	margin: "0 auto",
}));

const CardsBox = styled(Box)(() => ({
	width: "100%",
	display: "flex",
	flexWrap: "wrap",
	justifyContent: "center",
}));

const ContainerInfoPkm = styled(Box)(({ handleType, type }) => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	background: "#ffffff",
	border: "2px solid #000",
	boxShadow: 24,
	padding: "20px 30px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	borderRadius: "20px",
	overflow: "hidden",

	"&::before": {
		content: '""',
		width: 0,
		height: 0,
		borderLeft: `100px solid ${handleType(type)}`,
		borderBottom: "400px solid transparent",
		position: "absolute",
		left: 0,
		top: 0,
		zIndex: -1,
	},

	"&::after": {
		content: '""',
		width: 0,
		height: 0,
		borderRight: `100px solid ${handleType(type)}`,
		borderTop: "400px solid transparent",
		position: "absolute",
		right: 0,
		bottom: 0,
		zIndex: -1,
	},
}));

const TitlePkm = styled("h2")(() => ({
	textTransform: "capitalize",
	fontSize: "2rem",
}));

const ImgsPkm = styled(Box)(() => ({
	display: "flex",
	flexDirection: "column",
}));

const ImgPkm = styled(Box)(() => ({
	width: "100%",
	display: "flex",
}));

const TitleImg = styled("h3")(() => ({
	margin: 0,
	marginBottom: 10,
}));

const FrontPkm = styled("img")(() => ({}));
const BackPkm = styled("img")(() => ({}));
const ShinyFrontPkm = styled("img")(() => ({}));
const ShinyBackPkm = styled("img")(() => ({}));

const InfoPkm = styled(Box)(() => ({
	width: "100%",
	display: "flex",
	flexDirection: "column",
}));

const TitleInfoPkm = styled("h3")(() => ({}));

const TextInfoPkm = styled(Box)(() => ({
	marginBottom: 20,
	display: "flex",
	flexDirection: "column",
}));

const TextInfo = styled(Box)(() => ({
	display: "flex",
}));

const LeftSide = styled(Box)(() => ({
	width: "50%",
}));
const RightSide = styled(Box)(() => ({
	width: "50%",
}));

const AbilityBox = styled(Box)(() => ({}));
