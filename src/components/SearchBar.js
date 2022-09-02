import React from "react";
import { Box, styled, TextField } from "@mui/material";

const SearchBar = ({ filterPkm, setFilterPkm }) => {
	const handleChange = (e) => {
		setFilterPkm(e.target.value);
	};

	return (
		<SearchBarDiv>
			<SearchBarField
				fullWidth
				variant="filled"
				label="Búsqueda por nombre"
				placeholder="Ej: Charmander"
				value={filterPkm}
				onChange={handleChange}
			/>
		</SearchBarDiv>
	);
};

export default SearchBar;

const SearchBarDiv = styled(Box)(() => ({
	width: "60%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	margin: "40px 0",
}));

const SearchBarField = styled(TextField)(() => ({
	background: "rgba(255,255,255,1)",
}));
