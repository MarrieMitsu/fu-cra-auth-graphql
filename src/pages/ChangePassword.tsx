// Packages
import { Box, Button, Container, Grid, Hidden, Paper, TextField, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import Navbar from "../components/Navbar";

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
                            <TextField
                                error={false}
                                label="New password"
                                type="password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="primary"
                                helperText=""
                            />
                            <Box py={1} />
                            <TextField
                                error={false}
                                label="Confirm new password"
                                type="password"
                                variant="outlined"
                                size="small"
                                fullWidth
                                color="primary"
                                helperText=""
                            />
                            <Box py={2} />
                            <Button
                                color="secondary"
                                variant="contained"
                                disableElevation
                                fullWidth
                            >
                                Change password
                            </Button>
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
