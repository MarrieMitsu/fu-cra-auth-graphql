// Packages
import React from "react";
import Navbar from "../components/Navbar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, Container, Grid, Hidden, Link, Paper, TextField, Typography } from "@material-ui/core";
import { Link as LinkRouter } from "react-router-dom";

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

// ForgotPassword
const ForgotPassword: React.FC = () => {
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
                                label="Email"
                                type="email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="primary"
                                helperText=""
                            />
                            <Box py={1} />
                            <Grid container>
                                <Grid item xs>
                                    Already have an account?
                                    <Link
                                        component={LinkRouter}
                                        to="/login"
                                    >
                                        Login
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
                                Reset password
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
                                    Forgot Password
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
export default ForgotPassword;