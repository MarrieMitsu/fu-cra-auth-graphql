// Packages
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

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

// Props
interface Values {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

// ProfileChangePassword
const ProfileChangePassword: React.FC = () => {
    const classes = useStyles();
    const [disable, setDisable] = useState(true);
    const { oldPassword, newPassword, confirmNewPassword } = {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    }

    return (
        <>
            <Typography variant="h5">
                Change Password
            </Typography>
            <Box mt={3} className={classes.box}>
                <Formik
                    initialValues={{
                        oldPassword,
                        newPassword,
                        confirmNewPassword,
                    }}
                    validationSchema={Yup.object({
                        oldPassword: Yup.string(),
                        newPassword: Yup.string(),
                        confirmNewPassword: Yup.string().test("password-match", "Password must match", function (val) {
                            return this.parent.newPassword === val;
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
                            {formik.values.oldPassword !== oldPassword && formik.values.newPassword !== newPassword && formik.values.confirmNewPassword !== confirmNewPassword
                                ? setDisable(false) 
                                : setDisable(true)}
                            <TextField
                                label="Old password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="primary"
                                {...formik.getFieldProps('oldPassword')}
                                error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                            />
                            <Box py={2} />
                            <TextField
                                label="New password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="primary"
                                {...formik.getFieldProps('newPassword')}
                                error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                helperText={formik.touched.newPassword && formik.errors.newPassword}
                            />
                            <Box py={2} />
                            <TextField
                                label="Confirm new password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="primary"
                                {...formik.getFieldProps('confirmNewPassword')}
                                error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
                                helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
                            />
                            <Box py={2} />
                            <Button
                                className={classes.success}
                                variant="contained"
                                type="submit"
                                disabled={disable}
                                disableElevation
                            >
                                Update password
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

// Exports
export default ProfileChangePassword;