// Packages
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, FormikHelpers, FormikProps } from "formik";
import React, { useState } from "react";
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

// Props
interface Values {
    fullname: string;
    username: string;
    email: string;
}

// ProfileGeneral
const ProfileGeneral: React.FC = () => {
    const classes = useStyles();
    const [disable, setDisable] = useState(true);
    const { fullname, username, email } = {
        fullname: "Hatako Kushikawa",
        username: "Hatako",
        email: "Hatako@protonmail.com",
    }
    
    return (
        <>
            <Typography variant="h5">
                General
            </Typography>
            <Box mt={3} className={classes.box}>
                <Formik
                    initialValues={{
                        fullname,
                        username,
                        email,
                    }}
                    validationSchema={Yup.object({
                        fullname: Yup.string().required("required"),
                        username: Yup.string().required("required"),
                        email: Yup.string().email("Format must be an email").required("required"),
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
                            {formik.values.fullname !== fullname 
                                ? setDisable(false) 
                                : setDisable(true)}
                            <TextField
                                label="Fullname"
                                type="text"
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="primary"
                                {...formik.getFieldProps('fullname')}
                                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                                helperText={formik.touched.fullname && formik.errors.fullname}
                            />
                            <Box py={2} />
                            <TextField
                                label="Username"
                                type="text"
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="primary"
                                {...formik.getFieldProps('username')}
                                error={Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                                disabled
                            />
                            <Box py={2} />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                size="small"
                                color="primary"
                                {...formik.getFieldProps('email')}
                                error={Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                disabled
                            />
                            <Box py={2} />
                            
                                    <Button
                                        className={classes.success}
                                        variant="contained"
                                        type="submit"
                                        disabled={disable}
                                        disableElevation
                                    >
                                        Update
                                </Button>
                                
                        </form>
                    )}
                </Formik>
            </Box>
        </>
    );
}

// Exports
export default ProfileGeneral;