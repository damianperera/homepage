import * as React from "react"
import { ContentCopy, OpenInNew, Close } from "@mui/icons-material"
import {
	Modal,
	IconButton,
	CardMedia,
	Card,
	CardContent,
	CardActions,
	Typography,
	Tooltip,
} from "@mui/material"
import { Stack } from "@mui/system"

export function StyledModal({ title, description, open, setOpen, sourceUrl, featuredImageUrl }) {
	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "background.paper",
		boxShadow: 24,
		"& a": {
			textDecoration: "none",
			color: "#ce93d8",
		},
		".ml-manual-widget-container": {
			display: "none",
			visibility: "hidden",
		},
		".thelocal-here-be-magic": {
			display: "none",
			visibility: "hidden",
		},
		".MuiTypography-root img": {
			width: "100%",
			height: "auto",
			objectFit: "cover",
		},
		".post-thumbnail-credit": {
			fontStyle: "italic",
			fontSize: 12,
		},
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(sourceUrl)
	}

	const handleOpenLink = () => {
		window.open(sourceUrl, "_blank", "noopener,noreferrer")
	}

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<Card sx={{ maxWidth: "70%", maxHeight: "90%", ...style }}>
					{featuredImageUrl && (
						<div>
							<CardMedia component="img" height="200" image={featuredImageUrl} />
							<Stack
								direction="row"
								alignItems="left"
								justifyContent="left"
								gap={1}
								sx={{ position: "absolute", top: 0, right: 0 }}
							>
								<CardActions sx={{ paddingLeft: "2%", paddingBottom: "1.5%" }}>
									<Tooltip title="Copy Link">
										<IconButton size="small" onClick={handleCopyToClipboard}>
											<ContentCopy />
										</IconButton>
									</Tooltip>
									<Tooltip title="Open in Source">
										<IconButton size="small" onClick={handleOpenLink}>
											<OpenInNew />
										</IconButton>
									</Tooltip>
									<Tooltip title="Close">
										<IconButton size="small" onClick={handleClose}>
											<Close />
										</IconButton>
									</Tooltip>
								</CardActions>
							</Stack>
						</div>
					)}
					{!featuredImageUrl && (
						<Stack direction="row" alignItems="right" justifyContent="right" gap={1}>
							<CardActions sx={{ paddingLeft: "2%", paddingBottom: "1.5%" }}>
								<Tooltip title="Copy Link">
									<IconButton size="small" onClick={handleCopyToClipboard}>
										<ContentCopy color="secondary" />
									</IconButton>
								</Tooltip>
								<Tooltip title="Open in Source">
									<IconButton size="small" onClick={handleOpenLink}>
										<OpenInNew color="secondary" />
									</IconButton>
								</Tooltip>
								<Tooltip title="Close">
									<IconButton size="small" onClick={handleClose}>
										<Close color="secondary" />
									</IconButton>
								</Tooltip>
							</CardActions>
						</Stack>
					)}
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{title}
						</Typography>
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{ position: "static", overflowY: "scroll", maxHeight: 600 }}
						>
							{description}
						</Typography>
					</CardContent>
				</Card>
			</Modal>
		</div>
	)
}
