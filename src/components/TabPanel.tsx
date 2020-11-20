// Packages
import React from "react";
import { Box } from "@material-ui/core";

// Prop
type TabPanelProps = {
    children?: React.ReactNode;
    index: any;
    value: any;
}

// TabPanel
const TabPanel: React.FC<TabPanelProps> = ({
    children,
    index,
    value,
    ...props
}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...props}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

// Export
export default TabPanel;