// Packages
import { Box, Button, TextField, Typography } from "@material-ui/core";
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
        }
    })
);

// ProfileChangePassword
const ProfileChangePassword: React.FC = () => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        onSubmit: (val) => {
            console.log(val);
        }
    });

    return (
        <>
            <Typography variant="h5">
                Change Password
            </Typography>
            <Box mt={3} className={classes.box}>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        label="Old password"
                        name="oldPassword"
                        type="password"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        color="primary"
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                    />
                    <Box py={2} />
                    <TextField
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        label="New password"
                        name="newPassword"
                        type="password"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        color="primary"
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
                    />
                    <Box py={2} />
                    <TextField
                        error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                        label="Confirm new password"
                        name="confirmNewPassword"
                        type="password"
                        value={formik.values.confirmNewPassword}
                        onChange={formik.handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        color="primary"
                        helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                    />
                    <Box py={2} />
                    <Button
                        className={classes.success}
                        variant="contained"
                        type="submit"
                        disableElevation
                    >
                        Update password
                    </Button>
                </form>
            </Box>
        </>
    );
}

// Exports
export default ProfileChangePassword;