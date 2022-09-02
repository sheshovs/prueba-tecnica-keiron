import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import PokemonState from "./context/pokemon/pokemonState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<PokemonState>
			<App />
		</PokemonState>
	</React.StrictMode>
);
