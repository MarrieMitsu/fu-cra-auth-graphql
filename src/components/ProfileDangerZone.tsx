// Packages
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { useState } from "react";
import { ZoomTransition } from "../utils/customTransition";

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
                    <DialogContent>
                        <DialogContentText>
                            Important! We will delete your account permanently, theres no way to restore it back
                        </DialogContentText>
                        <TextField
                            error={false}
                            label="Username or email"
                            type="text"
                            variant="outlined"
                            size="small"
                            fullWidth
                            color="primary"
                            helperText=""
                        />
                        <Box py={1} />
                        <TextField
                            error={false}
                            label="Verify, type 'delete-account'"
                            type="text"
                            variant="outlined"
                            size="small"
                            fullWidth
                            color="primary"
                            helperText=""
                        />
                        <Box py={1} />
                        <TextField
                            error={false}
                            label="Confirm password"
                            type="password"
                            variant="outlined"
                            size="small"
                            fullWidth
                            color="primary"
                            helperText=""
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleDelAccDialog}
                            className={classes.error}
                            variant="contained"
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
                    <Box py={1} />
                </Dialog>
            </Box>
        </>
    );
}

// Exports
export default ProfileDangerZone;