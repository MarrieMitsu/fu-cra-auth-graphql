// Packages
import { Box, IconButton, Button, Container, Grid, Link, Hidden, Paper, TextField, Typography } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, FormikHelpers } from "formik";
import React, { useState, useEffect } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { useResetPasswordMutation } from "../generated/graphql";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import * as Yup from "yup";
import Navbar from "../components/Navbar";
import { isTokenValid } from "../utils/isTokenValid";
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
    newPassword: string;
    confirmNewPassword: string;
}

// ResetPassword
const ResetPassword: React.FC<RouteComponentProps> = ({ location, history }) => {
    const [resetPasswordMutation, { client }] = useResetPasswordMutation();
    const classes = useStyles();
    const searchParams = new URLSearchParams(location.search);
    const signature = searchParams.get("signature");
    const [isValid, setIsValid] = useState<boolean>(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        const checkSignature = () => {
            if (isTokenValid(signature)) {
                setIsValid(true);
            }
        }
        checkSignature();
    }, []);

    if (!signature) {
        return <Redirect to="/login" />
    }

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
                                    newPassword: "",
                                    confirmNewPassword: ""
                                }}
                                validationSchema={Yup.object({
                                    newPassword: Yup.string().required("required"),
                                    confirmNewPassword: Yup.string().test("password-match", "Password must match", function (val) {
                                        return this.parent.newPassword === val;
                                    }).required("required"),
                                })}
                                onSubmit={async (val: Values, _helper: FormikHelpers<Values>
                                ) => {
                                    try {
                                        const response = await resetPasswordMutation({
                                            variables: {
                                                signature,
                                                newPassword: val.newPassword
                                            }
                                        });
                                        
                                        if (response.data?.resetPassword.update) {
                                            client.resetStore();
                                            enqueueSnackbar("Reset Success", {
                                                variant: "success",
                                                action: key => {
                                                    <>
                                                        <IconButton
                                                            onClick={() => {
                                                                closeSnackbar(key);
                                                            }}
                                                        >
                                                            <CloseIcon />
                                                        </IconButton>
                                                    </>
                                                }
                                            });
                                            history.push('/login');
                                        } else {
                                            setIsValid(false);
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
                                        {!isValid ? (
                                            <Typography variant="h5" color="secondary">
                                                Your recovery link has expired
                                            </Typography>
                                        ) : (
                                        <>
                                            <TextField
                                                label="New password"
                                                type="password"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                color="primary"
                                                {...formik.getFieldProps('newPassword')}
                                                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                                            />
                                            <Box py={1} />
                                            <TextField
                                                label="Confirm new password"
                                                type="password"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                color="primary"
                                                {...formik.getFieldProps('confirmNewPassword')}
                                                error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                                                helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                                            />
                                        </>
                                        )}
                                        {!isValid ? (
                                        <>
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
                                                    <Grid 
                                                        item 
                                                        xs 
                                                        className={classes.textRight}
                                                    >
                                                        <Link
                                                            component={LinkRouter}
                                                            to="/forgot-password"
                                                        >
                                                                Resend recovery link
                                                        </Link>
                                                    </Grid>
                                            </Grid>
                                        </>
                                        ) : null}
                                        <Box py={2} />
                                        {!isValid ? null : (
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
                                        ) }
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
                                    Reset password
                                </Typography>
                            </Box>
                        </Grid>
                    </Hidden>
                </Grid>
            </Container>
        </>
    );
}

// Exports
export default ResetPassword;
