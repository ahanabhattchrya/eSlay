import { createTheme } from "@material-ui/core";

export const globalTheme = createTheme({
	palette: {
		primary: {
			main: "#f694c1",
		},
		secondary: {
			main: "#6e2594",
		},
	},
	typography: {
		fontFamily: ["Abel", "Roboto"],
	},
});

// Tutorial for themes and styling: https://medium.com/codex/how-to-style-material-ui-components-6b21ad1e1d8f
