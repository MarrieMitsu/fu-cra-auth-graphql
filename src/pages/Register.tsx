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
    fullname: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Register
const Register: React.FC = () => {
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
                                    fullname: "",
                                    username: "",
                                    email: "",
                                    password: "",
                                    confirmPassword: "",
                                }}
                                validationSchema={Yup.object({
                                    fullname: Yup.string().required("required"),
                                    username: Yup.string().required("required"),
                                    email: Yup.string().email("Format must be an email").required("required"),
                                    password: Yup.string().required("required"),
                                    confirmPassword: Yup.string().test("password-match", "Password must match", function (val) {
                                        return this.parent.password === val;
                                    }).required("requried"),
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
                                            label="Fullname"
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            color="primary"
                                            {...formik.getFieldProps('fullname')}
                                            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                            helperText={formik.touched.fullname && formik.errors.fullname}
                                        />
                                        <Box py={1} />
                                        <TextField
                                            label="Username"
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            color="primary"
                                            {...formik.getFieldProps('username')}
                                            error={formik.touched.username && Boolean(formik.errors.username)}
                                            helperText={formik.touched.username && formik.errors.username}
                                        />
                                        <Box py={1} />
                                        <TextField
                                            label="Email"
                                            type="email"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            color="primary"
                                            {...formik.getFieldProps('email')}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
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
                                        <TextField
                                            label="Confirm password"
                                            type="password"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            color="primary"
                                            {...formik.getFieldProps('confirmPassword')}
                                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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