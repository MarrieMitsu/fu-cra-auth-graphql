// Packages
import { AppBar, Box, Button, Dialog, DialogContent, DialogTitle, Divider, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { AccountCircle as AccountCircleIcon, Close as CloseIcon, Link as LinkIcon, Menu as MenuIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { useLogoutMutation } from "../generated/graphql";
import { AccessToken } from "../utils/accessToken";
import { IsLogin } from "../utils/isLogin";
import { SlideTransition } from "./customTransition";

// useStyles
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
            textDecoration: 'none',
            color: theme.palette.primary.contrastText,
            cursor: "pointer"
        },
        buttonBox: {
            display: "flex",
        },
        dialogTitle: {
            textAlign: 'right'
        },
    })
);

// Props
interface NavbarProps {
    login?: boolean;
}

// Navbar
const Navbar: React.FC<NavbarProps> = ({login}) => {
    const [logoutMutation, { client }] = useLogoutMutation();
    const classes = useStyles();
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleNavDialog = () => setOpen(!open);
    const handleOpenProfileDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    }
    const handleCloseProfileDialog = () => setAnchorEl(null);

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary" elevation={1}>
                <Toolbar>
                    <Typography 
                        component={LinkRouter} 
                        variant="h6" 
                        className={classes.title}
                        to={ login ? "/dashboard" : "/"}
                    >
                        GraphQL Authentication
                    </Typography>
                    {login ? (
                        <>
                            <IconButton
                                color="inherit"
                                onClick={handleOpenProfileDialog}
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu
                                keepMounted
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseProfileDialog}
                            >
                                <MenuItem 
                                    onClick={async () => {
                                        await logoutMutation();
                                        AccessToken.setAccessToken(null);
                                        await client.resetStore();
                                        IsLogin.setLogin(false);
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Hidden smUp>
                                <IconButton
                                    color="inherit"
                                    onClick={handleNavDialog}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Hidden>
                            <Hidden xsDown>
                                <Button
                                    component={LinkRouter}
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    to="/login"
                                >
                                    Login
                            </Button>
                                <Box mx={1} />
                                <Button
                                    component={LinkRouter}
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                    to="/register"
                                >
                                    Register
                            </Button>
                            </Hidden>
                        </>
                    ) }
                </Toolbar>
            </AppBar>
            { login? null : (
                <Hidden smUp>
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleNavDialog}
                        TransitionComponent={SlideTransition}
                    >
                        <DialogTitle className={classes.dialogTitle}>
                            <IconButton
                                color="primary"
                                onClick={handleNavDialog}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <List component="div">
                                <Divider/>
                                <ListItem
                                    button
                                    component={LinkRouter}
                                    to="/login"
                                >
                                    <ListItemIcon>
                                        <LinkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <Divider/>
                                <ListItem
                                    button
                                    component={LinkRouter}
                                    to="/register"
                                >
                                    <ListItemIcon>
                                        <LinkIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Register" />
                                </ListItem>
                            </List>
                        </DialogContent>
                    </Dialog>
                </Hidden>
            ) }
            
        </div>
    );
}

// Export
export default Navbar;