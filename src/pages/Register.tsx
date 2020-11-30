// Packages
import { Box, Button, Container, Grid, Hidden, Link, Paper, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useFormik } from "formik";

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

// Register
const Register: React.FC = () => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            fullname: "",
            username: "",
            email: "",
            password: "",
        },
        onSubmit: (val) => {
            console.log("Submit data: ", val);
        }
    });

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
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                    label="Fullname"
                                    name="fullname"
                                    type="text"
                                    value={formik.values.fullname}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    color="primary"
                                    helperText={formik.touched.fullname && formik.errors.fullname}
                                />
                                <Box py={1} />
                                <TextField
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    label="Username"
                                    name="username"
                                    type="text"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    color="primary"
                                    helperText={formik.touched.username && formik.errors.username}
                                />
                                <Box py={1} />
                                <TextField
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    color="primary"
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <Box py={1} />
                                <TextField
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    color="primary"
                                    helperText={formik.touched.password && formik.errors.password}
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
                                    type="submit"
                                    disableElevation
                                    fullWidth
                                >
                                    Register
                                </Button>
                            </form>
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
                                    Register
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
export default Register;