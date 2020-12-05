// Packages
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { MeDocument, MeQuery, useMeQuery, useUpdateUserMutation } from "../generated/graphql";

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
    const [updateUserMutation] = useUpdateUserMutation();
    const { data } = useMeQuery();
    const classes = useStyles();
    const [disable, setDisable] = useState(true);
    
    let { fullname, username, email } = {
        fullname: "",
        username: "",
        email: ""
    };
    if (data?.me) {
        fullname = data.me.name;
        username = data.me.username;
        email = data.me.email;
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
                    onSubmit={async (val: Values, { setErrors }: FormikHelpers<Values>) => {
                        const response = await updateUserMutation({
                            variables: {
                                name: val.fullname
                            },
                            update: (cache, { data }) => {
                                if (!data) {
                                    return null;
                                }
                                cache.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        me: data.updateUser
                                    }
                                });
                            }
                        });

                        if (response.data?.updateUser) {
                            console.log("Update success");
                        } else {
                            console.log("Update error");
                        }
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