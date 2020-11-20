// Packages
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// customTheme
const customTheme = responsiveFontSizes(createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            "@global": {
                html: {
                    height: "100%",
                },
                body: {
                    height: "100%",
                },
            },
        },
    },
    palette: {
        type: "light"
    }
}));

// Export
export default customTheme;