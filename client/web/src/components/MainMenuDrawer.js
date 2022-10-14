import * as React from "react";
import { KeyRounded, GitHub } from "@mui/icons-material";
import { Box, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";

function MainMenuDrawer({ isOpen, onChange }) {
    const licenseURL = "https://github.com/damianperera/homepage/blob/main/LICENSE.md";
    const repositoryURL = "https://github.com/damianperera/homepage";

    const handleLicenseClick = () => {
        window.open(licenseURL, "_blank", "noopener,noreferrer");
    }

    const handleRepositoryClick = () => {
        window.open(repositoryURL, "_blank", "noopener,noreferrer");
    }
    
    return (
        <Drawer
        open={isOpen}
        onClose={onChange(false)}
        >
        <Box 
            sx={{ width: 200 }}
            role="presentation"
            onClick={onChange(false)}
            onKeyDown={onChange(false)}
        >
            <ListItemText primary="Home" secondary="Dev Homepage" sx={{ marginLeft: 1, ".MuiListItemText-primary": { fontWeight: "bold" } }} />
            <Divider />
            <Box 
            sx={{
                position: "fixed",
                bottom: 0,
                width: 200
            }}
            >
            <Divider />
            <ListItem key="repository" disablePadding>
                <ListItemButton onClick={handleRepositoryClick}>
                <ListItemIcon>
                    <GitHub />
                </ListItemIcon>
                <ListItemText primary="Repository" />
                </ListItemButton>
            </ListItem>
            <ListItem key="license" disablePadding>
                <ListItemButton onClick={handleLicenseClick}>
                <ListItemIcon>
                    <KeyRounded />
                </ListItemIcon>
                <ListItemText primary="License" />
                </ListItemButton>
            </ListItem>
            </Box>
        </Box>
        </Drawer>
    );
}

export default MainMenuDrawer;