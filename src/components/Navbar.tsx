// Packages
import { AppBar, Box, Button, Dialog, DialogContent, DialogTitle, Hidden, IconButton, List, ListItem, Slide, Toolbar, Typography, ListItemText, ListItemIcon, Menu, MenuItem, Divider } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Close as CloseIcon, Menu as MenuIcon, Link as LinkIcon, AccountCircle as AccountCircleIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";

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

// Transition
const Transition = React.forwardRef((
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) => {
    return (
        <Slide
            direction="left"
            timeout={2000}
            ref={ref} {...props}
        />
    );
});

// Props
type NavbarProps = {
    login?: boolean;
}

// Navbar
const Navbar: React.FC<NavbarProps> = ({login}) => {
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
                                    component={LinkRouter}
                                    to="/"
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
                        TransitionComponent={Transition}
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