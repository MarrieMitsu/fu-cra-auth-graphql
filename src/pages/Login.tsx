// Packages
import { Box, Button, Container, Grid, Hidden, Link, Paper, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

// useStyles
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        grid: {
            marginTop: 100,
            flexGrow: 1,
        },
        formBox: {
            padding: '30px 15px',
            borderRadius: 0,
            minHeight: 300
        },
        bannerBox: {
            padding: 10,
        },
        textRight: {
            textAlign: "right",
        },
    })
);

// Login
const Login: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <Grid 
                    className={classes.grid}
                    container
                    direction="row"
                    justify="center"
                    spacing={2}
                >
                    <Grid item xs={12} lg={5}>
                        <Paper
                            className={classes.formBox}
                        >
                            <TextField 
                                error={false}
                                label="Username or email"
                                type="text"
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="primary"
                                helperText=""
                            />
                            <Box py={1} />
                            <TextField
                                error={false}
                                label="Password"
                                type="password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="primary"
                                helperText=""
                            />
                            <Box py={1} />
                            <Grid container>
                                <Grid item xs>
                                    <Link
                                        component={LinkRouter}
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </Grid>
                                <Grid item xs className={classes.textRight}>
                                    <Link
                                        component={LinkRouter}
                                        to="/forgot-password"
                                    >
                                        Forgot password
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box py={2} />
                            <Button
                                color="secondary"
                                variant="contained"
                                disableElevation
                                fullWidth
                            >
                                Login
                            </Button>
                        </Paper>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item xs>
                            <Box className={classes.bannerBox}>
                                <Typography 
                                    align="center" 
                                    variant="h2" 
                                    color="primary"
                                >
                                    Login
                                </Typography>
                            </Box>
                        </Grid>
                    </Hidden>
                </Grid>
            </Container>
        </>
    );
}

// Export
export default Login;