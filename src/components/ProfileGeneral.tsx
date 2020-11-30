// Packages
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { useFormik } from "formik";

// useStyles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            width: "100%",
            [theme.breakpoints.up('md')]: {
                width: "40%",
            }
        },
        success: {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.common.white,
            "&:hover": {
                backgroundColor: theme.palette.success.dark,
            }
        },
        error: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            }
        },
    })
);

// ProfileGeneral
const ProfileGeneral: React.FC = () => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            fullname: "Hatako Kushikawa",
            username: "Hatako",
            email: "hatako@protonmail.com",
        },
        onSubmit: (val) => {
            console.log(val);
        }
    });

    return (
        <>
            <Typography variant="h5">
                General
            </Typography>
            <Box mt={3} className={classes.box}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        label="Fullname"
                        name="fullname"
                        type="text"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        color="primary"
                        helperText={formik.touched.fullname && formik.errors.fullname}
                    />
                    <Box py={2} />
                    <TextField 
                        error={false}
                        label="Username"
                        type="text"
                        value={formik.values.username}
                        fullWidth
                        variant="outlined"
                        size="small"
                        color="primary"
                        disabled
                    />
                    <Box py={2} />
                    <TextField
                        error={false}
                        label="Email"
                        type="email"
                        value={formik.values.email}
                        fullWidth
                        variant="outlined"
                        size="small"
                        color="primary"
                        disabled
                    />
                    <Box py={2} />
                    <Grid
                        container
                        direction="row"
                        spacing={3}
                    >
                        <Grid item>
                            <Button
                                className={classes.success}
                                variant="contained"
                                type="submit"
                                disableElevation
                            >
                                Update
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                className={classes.error}
                                variant="contained"
                                disableElevation
                            >
                                Restore Change
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    );
}

// Exports
export default ProfileGeneral;