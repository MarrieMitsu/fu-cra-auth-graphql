// Packages
import { Box, Button, Container, Grid, Hidden, Link, Paper, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

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
    email: string;
}

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
                            <Formik
                                initialValues={{
                                    email: "",
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email("Format must be an email").required("required")
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
                                            Reset password
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