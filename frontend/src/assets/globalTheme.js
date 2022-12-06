import { createTheme } from "@material-ui/core";
import { blue, grey } from "@material-ui/core/colors";

export const globalTheme = createTheme({
	palette: {
		primary: {
			main: grey[500],
			light: grey[300],
			dark: grey[700],
		},
		secondary: {
			main: blue[500],
			dark: blue[700],
			light: blue[300],
		},
	},
});

// Tutorial for themes and styling: https://medium.com/codex/how-to-style-material-ui-components-6b21ad1e1d8f
