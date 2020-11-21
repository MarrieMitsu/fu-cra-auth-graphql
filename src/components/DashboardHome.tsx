// Packages
import { Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";

// useStyles
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            minHeight: 300,
        },
    })
);

// DashboardHome
const DashboardHome: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid item>
                <Typography 
                    variant="h4"
                    color="primary"
                >
                    Hey! you are finally Log In
                </Typography>
            </Grid>
        </Grid>
    );
}

// Export
export default DashboardHome;