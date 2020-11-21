// Packages
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

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

    return (
        <>
            <Typography variant="h5">
                General
            </Typography>
            <Box mt={3} className={classes.box}>
                <TextField
                    error={false}
                    label="Fullname"
                    type="text"
                    fullWidth
                    variant="outlined"
                    size="small"
                    color="primary"
                    value="Hatako Kushikawa"
                />
                <Box py={2} />
                <TextField 
                    error={false}
                    label="Username"
                    type="text"
                    fullWidth
                    variant="outlined"
                    size="small"
                    color="primary"
                    value="Hatako"
                    disabled
                />
                <Box py={2} />
                <TextField
                    error={false}
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                    size="small"
                    color="primary"
                    value="hatako@protonmail.com"
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
            </Box>
        </>
    );
}

// Exports
export default ProfileGeneral;