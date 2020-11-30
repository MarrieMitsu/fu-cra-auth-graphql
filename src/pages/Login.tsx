// Packages
import { Box, Button, Container, Grid, Hidden, Link, Paper, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import * as Yup from "yup";
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

// Props
interface Values {
    usernameOrEmail: string;
    password: string;
}

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
                            <Formik
                                initialValues={{
                                    usernameOrEmail: "",
                                    password: ""
                                }}
                                validationSchema={Yup.object({
                                    usernameOrEmail: Yup.string().required("required"),
                                    password: Yup.string().required("required")
                                })}
                                onSubmit={(
                                    val: Values, 
                                    { setSubmitting }: FormikHelpers<Values>
                                ) => {
                                    console.log("Submit data: ", val);
                                }}
                            >
                                {formik => (
                                    <form onSubmit={formik.handleSubmit}>
                                        <TextField
                                            label="Username or email"
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            color="primary"
                                            {...formik.getFieldProps('usernameOrEmail')}
                                            error={formik.touched.usernameOrEmail && Boolean(formik.errors.usernameOrEmail)}
                                            helperText={formik.touched.usernameOrEmail && formik.errors.usernameOrEmail}
                                        />
                                        <Box py={1} />
                                        <TextField
                                            label="Password"
                                            type="password"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            color="primary"
                                            {...formik.getFieldProps('password')}
                                            error={formik.touched.password && Boolean(formik.errors.password)}
                                            helperText={formik.touched.password && formik.errors.password}
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
                                            type="submit"
                                            fullWidth
                                        >
                                            Login
                                        </Button>
                                    </form>
                                )}
                            </Formik>
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