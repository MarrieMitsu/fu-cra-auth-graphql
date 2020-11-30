// Packages
import { Box, Button, Container, Grid, Hidden, Paper, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, FormikHelpers } from "formik";
import React from "react";
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
    newPassword: string;
    confirmNewPassword: string;
}

// ChangePassword
const ChangePassword: React.FC = () => {
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
                                    newPassword: "",
                                    confirmNewPassword: ""
                                }}
                                validationSchema={Yup.object({
                                    newPassword: Yup.string().required("required"),
                                    confirmNewPassword: Yup.string().required("required")
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
                                        <Box py={2} />
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                            disableElevation
                                            fullWidth
                                        >
                                            Change password
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
                                    Change password
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
export default ChangePassword;
