import { createTheme } from "@material-ui/core";
import { blue, lightBlue } from "@material-ui/core/colors";

export const theme = createTheme({
	palette: {
		primary: {
			main: lightBlue[500],
			light: lightBlue[300],
			dark: lightBlue[700],
		},
		secondary: {
			main: blue[500],
			dark: blue[700],
			light: blue[300],
		},
	},
});

// Tutorial for themes and styling: https://medium.com/codex/how-to-style-material-ui-components-6b21ad1e1d8f
