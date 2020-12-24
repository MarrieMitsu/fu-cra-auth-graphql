// Packages
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React, { useEffect, useState } from "react";
import Router from "./routes";
import { AccessToken } from "./utils/accessToken";
import customTheme from "./utils/customTheme";
import { IsLogin } from "./utils/isLogin";

// App
const App: React.FC = () => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function refreshToken() {
			const response = await fetch("http://localhost:4000/api/auth/refresh_token", {
				method: "GET",
				credentials: "include",
			});

			const { accessToken } = await response.json();
			AccessToken.setAccessToken(accessToken);
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
		if (IsLogin.value()) {
			refreshToken();
		} else {
			setLoading(false);
		}
	}, []);

	return (
		<ThemeProvider theme={customTheme}>
			{loading ? (
				<Backdrop open={loading}>
					<CircularProgress color="inherit" />
				</Backdrop>
			) : (
				<SnackbarProvider
					maxSnack={3}
				>
					<CssBaseline />
					<Router />
				</SnackbarProvider>
			)}
		</ThemeProvider>
	);
}

// Export
export default App;