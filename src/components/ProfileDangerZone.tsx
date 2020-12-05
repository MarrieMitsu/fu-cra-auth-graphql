// Packages
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDeleteUserMutation, useMeQuery } from "../generated/graphql";
import { mapFieldError } from "../utils/mapFieldError";
import { ZoomTransition } from "./customTransition";

// useStyles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        box: {
            width: "100%",
            [theme.breakpoints.up('md')]: {
                width: "40%",
            }
        },
        error: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            }
        }
    })
);

// Props
interface Values {
    usernameOrEmail: string;
    verify: string;
    confirmPassword: string;
}


// ProfileDangerZone
const ProfileDangerZone: React.FC = () => {
    const [deleteUserMutation] = useDeleteUserMutation();
    const { data: meData } = useMeQuery();
    const classes = useStyles();
    const [delAccDialog, setDelAccDialog] = useState<boolean>(false);
    const [disable, setDisable] = useState(true);
    const { usernameOrEmail, verify, confirmPassword } = {
        usernameOrEmail: "",
        verify: "",
        confirmPassword: "",
    }

    const handleDelAccDialog = () => setDelAccDialog(!delAccDialog);

    return (
        <>
            <Typography variant="h5">
                Danger Zone
            </Typography>
            <Box mt={3} className={classes.box}>
                <Typography variant="body2">
                    Once you delete your account, it will be permanently deleted
                </Typography>
                <Box py={1} />
                <Button
                    onClick={handleDelAccDialog}
                    className={classes.error}
                    variant="contained"
                    disableElevation
                >
                    Delete account
                </Button>
                <Dialog
                    open={delAccDialog}
                    onClose={handleDelAccDialog}
                    maxWidth="xs"
                    fullWidth
                    TransitionComponent={ZoomTransition}
                    >
                    <DialogTitle>
                        Delete account
                    </DialogTitle>
                    <Formik
                        initialValues={{
                            usernameOrEmail,
                            verify,
                            confirmPassword,
                        }}
                        validationSchema={Yup.object({
                            usernameOrEmail: Yup.string().required("required"),
                            verify: Yup.string().required("required").test("verify-match", "Input not match", function(val) {
                                return val === "delete-account";
                            }),
                            confirmPassword: Yup.string().required("required"),
                        })}
                        onSubmit={async (val: Values, { setErrors }: FormikHelpers<Values>) => {
                            console.log("Submit data: ", val);
                            const response = await deleteUserMutation({
                                variables: {
                                    input: {
                                        unique: val.usernameOrEmail,
                                        verify: val.verify,
                                        password: val.confirmPassword
                                    }
                                },
                                update: (cache) => {
                                    cache.evict({id: "User:" + meData?.me?.id});
                                }
                            });

                            if (response.data?.deleteUser?.errors) {
                                setErrors(mapFieldError(response.data.deleteUser.errors));
                            } else {
                                console.log(response.data?.deleteUser);
                            }
                        }}
                    >
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                {formik.values.usernameOrEmail !== usernameOrEmail && formik.values.verify !== verify && formik.values.confirmPassword !== confirmPassword
                                    ? setDisable(false)
                                    : setDisable(true)}
                                <DialogContent>
                                    <DialogContentText>
                                        Important! We will delete your account permanently, theres no way to restore it back
                            </DialogContentText>
                                    <TextField
                                        label="Username or email"
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        color="primary"
                                        {...formik.getFieldProps('usernameOrEmail')}
                                        error={formik.touched.usernameOrEmail && Boolean(formik.errors.usernameOrEmail)}
                                        helperText={formik.touched.usernameOrEmail && formik.errors.usernameOrEmail}
                                    />
                                    <Box py={1} />
                                    <TextField
                                        label="Verify, type 'delete-account'"
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        color="primary"
                                        {...formik.getFieldProps('verify')}
                                        error={formik.touched.verify && Boolean(formik.errors.verify)}
                                        helperText={formik.touched.verify && formik.errors.verify}
                                    />
                                    <Box py={1} />
                                    <TextField
                                        label="Confirm password"
                                        type="password"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        color="primary"
                                        {...formik.getFieldProps('confirmPassword')}
                                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        className={classes.error}
                                        variant="contained"
                                        type="submit"
                                        disabled={disable}
                                        size="small"
                                        disableElevation
                                    >
                                        Delete Account
                                    </Button>
                                    <Button
                                        onClick={handleDelAccDialog}
                                        color="primary"
                                        variant="contained"
                                        size="small"
                                        disableElevation
                                    >
                                        Cancel
                                    </Button>
                                </DialogActions>
                            </form>
                        )}
                    </Formik>
                    <Box py={1} />
                </Dialog>
            </Box>
        </>
    );
}

// Exports
export default ProfileDangerZone;