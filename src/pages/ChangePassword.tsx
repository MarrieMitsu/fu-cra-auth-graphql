// Packages
import { Box, Button, Container, Grid, Hidden, Paper, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
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

// ChangePassword
const ChangePassword: React.FC = () => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmNewPassword: "",
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
                                    error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                    label="New password"
                                    name="newPassword"
                                    type="password"
                                    value={formik.values.newPassword}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    color="primary"
                                    helperText={formik.touched.newPassword && formik.errors.newPassword}
                                />
                                <Box py={1} />
                                <TextField
                                    error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                                    label="Confirm new password"
                                    name="confirmNewPassword"
                                    type="password"
                                    value={formik.values.confirmNewPassword}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    color="primary"
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
