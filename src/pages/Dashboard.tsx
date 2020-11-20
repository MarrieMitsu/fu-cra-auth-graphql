// Packages
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Container, Tabs, Tab, Divider } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TabPanel from "../components/TabPanel";
import DashboardHome from "../components/DashboardHome";
import DashboardProfile from "../components/DashboardProfile";

// useStyles
const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        container: {
            paddingTop: 20
        }
    })
);

// Dashboard
const Dashboard: React.FC = () => {
    const classes = useStyles();
    const [indicator, setIndicator] = useState<number>(0);

    const handleIndicator = (event: React.ChangeEvent<{}>, val: number) => {
        setIndicator(val);
    }

    return (
        <>
            <Navbar login />
            <Container className={classes.container} >
                <Tabs
                    value={indicator}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleIndicator}
                >
                    <Tab label="Home" />
                    <Tab label="Profile" />
                </Tabs>
                <Divider />
                <TabPanel value={indicator} index={0}>
                    <DashboardHome />
                </TabPanel>
                <TabPanel value={indicator} index={1}>
                    <DashboardProfile />
                </TabPanel>
            </Container>
        </>
    );
}

// Export
export default Dashboard;