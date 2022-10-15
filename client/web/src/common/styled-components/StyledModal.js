import * as React from "react"
import { ContentCopy, OpenInNew, Close } from "@mui/icons-material"
import { AppBar, Box, Modal, IconButton, Toolbar } from "@mui/material"

export function StyledModal({ title, description, open, setOpen, copyLink }) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: 400,
		bgcolor: "background.paper",
		border: "2px solid #1A2027",
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
		"& a": {
			textDecoration: "none",
			color: "white",
		},
		".ml-manual-widget-container": {
			display: "none",
			visibility: "hidden",
		},
		".thelocal-here-be-magic": {
			display: "none",
			visibility: "hidden",
		},
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(copyLink)
	}

	const handleOpenLink = () => {
		window.open(copyLink, "_blank", "noopener,noreferrer")
	}

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<Box sx={{ ...style, width: "90%", height: "90%" }}>
					<AppBar>
						<Toolbar sx={{ height: "10vh" }}>
							<Box display="flex" justifyContent="left" alignItems="center" sx={{ flexGrow: 1 }}>
								<h2>{title}</h2>
							</Box>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
								onClick={handleCopyToClipboard}
							>
								<ContentCopy />
							</IconButton>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
								onClick={handleOpenLink}
							>
								<OpenInNew />
							</IconButton>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								aria-label="menu"
								sx={{ mr: 2 }}
								onClick={handleClose}
							>
								<Close />
							</IconButton>
						</Toolbar>
					</AppBar>
					<Box
						sx={{
							paddingTop: "7%",
							overflowY: "scroll",
							display: "flex",
							flexGrow: 1,
							flexDirection: "column",
							maxHeight: "100%",
							position: "relative",
						}}
					>
						{description}
					</Box>
				</Box>
			</Modal>
		</div>
	)
}
