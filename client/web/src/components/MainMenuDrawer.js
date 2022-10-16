import * as React from "react"
import { KeyRounded, GitHub } from "@mui/icons-material"
import {
	Box,
	Drawer,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Divider,
	Tooltip,
} from "@mui/material"

function MainMenuDrawer({ isOpen, onChange }) {
	const licenseURL = "https://github.com/damianperera/homepage/blob/main/LICENSE"
	const repositoryURL = "https://github.com/damianperera/homepage"
	const deployStatus =
		"https://img.shields.io/github/workflow/status/damianperera/homepage/deploy?style=flat-square"

	const handleLicenseClick = () => {
		window.open(licenseURL, "_blank", "noopener,noreferrer")
	}

	const handleRepositoryClick = () => {
		window.open(repositoryURL, "_blank", "noopener,noreferrer")
	}

	return (
		<Drawer open={isOpen} onClose={onChange(false)}>
			<Box
				sx={{ width: 200 }}
				role="presentation"
				onClick={onChange(false)}
				onKeyDown={onChange(false)}
			>
				<ListItemText
					primary="Home"
					secondary="Dev Homepage"
					sx={{
						marginLeft: 1,
						".MuiListItemText-primary": { fontWeight: "bold" },
					}}
				/>
				<img
					src={deployStatus}
					width={100}
					style={{ paddingLeft: "4%", paddingBottom: "2%" }}
					alt=""
				/>
				<Divider />
				<Box
					sx={{
						position: "fixed",
						bottom: 0,
						width: 200,
					}}
				>
					<Divider />
					<Tooltip title="GitHub">
						<ListItem key="repository" disablePadding>
							<ListItemButton onClick={handleRepositoryClick}>
								<ListItemIcon>
									<GitHub />
								</ListItemIcon>
								<ListItemText primary="Repository" />
							</ListItemButton>
						</ListItem>
					</Tooltip>
					<Tooltip title="MIT License">
						<ListItem key="license" disablePadding>
							<ListItemButton onClick={handleLicenseClick}>
								<ListItemIcon>
									<KeyRounded />
								</ListItemIcon>
								<ListItemText primary="License" />
							</ListItemButton>
						</ListItem>
					</Tooltip>
				</Box>
			</Box>
		</Drawer>
	)
}

export default MainMenuDrawer
