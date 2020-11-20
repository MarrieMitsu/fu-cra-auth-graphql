// Packages
import { Avatar, Box, ButtonBase, Grid, IconButton, Tooltip, Dialog, Card, CardMedia, Divider, Tabs, Tab } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { PhotoCamera as PhotoCameraIcon } from "@material-ui/icons";
import React, { useState } from "react";
import TabPanel from "./TabPanel";
import ProfileGeneral from "./ProfileGeneral";
import ProfileDangerZone from "./ProfileDangerZone";
import ProfileChangePassword from "./ProfileChangePassword";

// useStyles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minHeight: 300,
        },
        large: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
        buttonBase: {
            borderRadius: "50%",
        },
        profilePic: {
            position: "relative",
        },
        photoCameraIcon: {
            right: -10,
            bottom: -15,
            position: "absolute",
        },
        cardMedia: {
            height: 300,
            width: 300
        },
        fullWidth: {
            width: "100%",
        },
        verticalTabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
        },
        grow: {
            flexGrow: 1,
        },
    })
);

// DashboardProfile
const DashboardProfile: React.FC = () => {
    const classes = useStyles();
    const [photoDialog, setPhotoDialog] = useState(false);
    const [indicator, setIndicator] = useState<number>(0);

    const handlePhotoDialog = () => setPhotoDialog(!photoDialog);
    const handleIndicator = (event: React.ChangeEvent<{}>, val: number) => {
        setIndicator(val);
    }
    
    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            alignItems="center"
            justify="space-evenly"
        >
            <Grid item>
                <Box className={classes.profilePic}>
                    <Tooltip title="Look details" placement="top" arrow>
                        <ButtonBase
                            className={classes.buttonBase}
                            focusRipple
                            onClick={handlePhotoDialog}
                        >
                            <Avatar 
                                alt="profile-image"
                                className={classes.large}
                            >
                            </Avatar>
                        </ButtonBase>
                    </Tooltip>
                    <Dialog
                        open={photoDialog}
                        onClose={handlePhotoDialog}
                    >
                        <Card>
                            <CardMedia
                                className={classes.cardMedia}
                            />
                        </Card>
                    </Dialog>
                    <input accept="image/*" hidden id="photo-button" type="file" />
                    <label htmlFor="photo-button">
                        <Tooltip title="Change photo">
                            <IconButton
                                component="span"
                                className={classes.photoCameraIcon}
                                color="primary"
                            >
                                <PhotoCameraIcon />
                            </IconButton>
                        </Tooltip>
                    </label>
                </Box>
            </Grid>
            <Grid item className={classes.fullWidth}>
                <Box>
                    <Grid 
                        container
                        direction="row"
                    >
                        <Grid item>
                            <Tabs
                                className={classes.verticalTabs}
                                orientation="vertical"
                                variant="scrollable"
                                textColor="secondary"
                                value={indicator}
                                onChange={handleIndicator}
                            >
                                <Tab label="General" />
                                <Tab label="Change Password" />
                                <Tab label="Danger Zone" />
                            </Tabs>
                        </Grid>
                        <Grid 
                            item
                            className={classes.grow}
                        >
                            <Divider />
                            <TabPanel value={indicator} index={0}>
                                <ProfileGeneral />
                            </TabPanel>
                            <TabPanel value={indicator} index={1}>
                                <ProfileChangePassword />
                            </TabPanel>
                            <TabPanel value={indicator} index={2}>
                                <ProfileDangerZone />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>
    );
}

// Export
export default DashboardProfile;