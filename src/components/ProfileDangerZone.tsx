// Packages
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { ZoomTransition } from "../utils/customTransition";
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
        error: {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.common.white,
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            }
        }
    })
);

// ProfileDangerZone
const ProfileDangerZone: React.FC = () => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            usernameOrEmail: "",
            verify: "",
            confirmPassword: "",
        },
        onSubmit: (val) => {
            console.log(val);
        }
    });
    const [delAccDialog, setDelAccDialog] = useState<boolean>(false);

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
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <DialogContentText>
                                Important! We will delete your account permanently, theres no way to restore it back
                            </DialogContentText>
                            <TextField
                                error={formik.touched.usernameOrEmail && Boolean(formik.errors.usernameOrEmail)}
                                label="Username or email"
                                name="usernameOrEmail"
                                type="text"
                                value={formik.values.usernameOrEmail}
                                onChange={formik.handleChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="primary"
                                helperText={formik.touched.usernameOrEmail && formik.errors.usernameOrEmail}
                            />
                            <Box py={1} />
                            <TextField
                                error={formik.touched.verify && Boolean(formik.errors.verify)}
                                label="Verify, type 'delete-account'"
                                name="verify"
                                type="text"
                                value={formik.values.verify}
                                onChange={formik.handleChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="primary"
                                helperText={formik.touched.verify && formik.errors.verify}
                            />
                            <Box py={1} />
                            <TextField
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                label="Confirm password"
                                name="confirmPassword"
                                type="password"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="primary"
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={handleDelAccDialog}
                                className={classes.error}
                                variant="contained"
                                type="submit"
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
                    <Box py={1} />
                </Dialog>
            </Box>
        </>
    );
}

// Exports
export default ProfileDangerZone;