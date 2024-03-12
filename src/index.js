import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { FavoritesContextProvider } from "./store/FavoritesContext";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render (
	<FavoritesContextProvider>
		<HashRouter>
			<App />
		</HashRouter>
	</FavoritesContextProvider>
)

reportWebVitals()