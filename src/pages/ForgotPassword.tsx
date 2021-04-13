// Packages
import { Box, Button, IconButton, Container, Grid, Hidden, Link, Paper, TextField, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, FormikHelpers } from "formik";
import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import { useForgotPasswordMutation } from "../generated/graphql";
import { mapFieldError } from "../utils/mapFieldError";
import { useSnackbar } from "notistack";

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
    const [forgotPasswordMutation] = useForgotPasswordMutation();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
                                onSubmit={async (val: Values, { setErrors, setStatus }: FormikHelpers<Values>) => {
                                    try {
                                        const response = await forgotPasswordMutation({
                                            variables: {
                                                email: val.email
                                            }
                                        });

                                        if (response.data?.forgotPassword.errors) {
                                            setErrors(mapFieldError(response.data.forgotPassword.errors));
                                        } else {
                                            setStatus(true);
                                        }
                                    } catch (err) {
                                        let msg: string;
                                        if (err.message === "Failed to fetch") {
                                            msg = "Network errors";
                                        } else {
                                            msg = "Something wrong with the server";
                                        }
                                        enqueueSnackbar(msg, {
                                            variant: "error",
                                            action: key => (
                                                <>
                                                    <IconButton
                                                        onClick={() => {
                                                            closeSnackbar(key);
                                                        }}
                                                    >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </>
                                            )
                                        });
                                    }
                                }}
                            >
                                {formik => (
                                    <form onSubmit={formik.handleSubmit}>
                                        {formik.status ? (
                                            <Typography variant="h5" color="secondary">
                                                We sent a recovery link to you at {formik.values.email}
                                            </Typography>
                                        ) : (
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
                                        )}
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
                                            {formik.status ? (
                                                <Grid 
                                                    item 
                                                    xs 
                                                    className={classes.textRight}
                                                >
                                                    <Link
                                                        component="button"
                                                        onClick={() => {
                                                            formik.setStatus(false);
                                                            formik.resetForm({
                                                                values: {
                                                                    email: "",
                                                                }
                                                            });
                                                        }}
                                                    >
                                                        Resend recovery link
                                                    </Link>
                                                </Grid>
                                            ) : null}
                                        </Grid>
                                        <Box py={2} />
                                        {formik.status ? null : (
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                type="submit"
                                                disabled={formik.isSubmitting}
                                                disableElevation
                                                fullWidth
                                            >
                                                Reset password
                                            </Button>
                                        )}
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