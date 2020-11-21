// Packages
import { Container, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import Navbar from "../components/Navbar";

// useStyles
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container: {
            height: "inherit"
        },
        grid: {
            flexGrow: 1,
            height: "100%",
        },
    })
);

// Home
const Home: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Navbar />
            <Container maxWidth="lg" className={classes.container}>
                <Grid
                    className={classes.grid}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Typography variant="h2" align="center" color="secondary">
                            GraphQL Authentication
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="secondary">
                            Trying to apply my knowledge of Authentication and GraphQL in this simple application
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

// Export
export default Home;