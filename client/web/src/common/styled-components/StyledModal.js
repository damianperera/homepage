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
		navigator.clipboard.writeText(sourceUrl)
	}

	const handleOpenLink = () => {
		window.open(sourceUrl, "_blank", "noopener,noreferrer")
	}

	return (
		<div>
			<Modal open={open} onClose={handleClose}>
				<Card sx={{ maxWidth: "70%", maxHeight: "90%", ...style }}>
					{featuredImageUrl && <CardMedia component="img" height="200" image={featuredImageUrl} />}
					<Stack direction="row" alignItems="left" justifyContent="left" gap={1}>
						<CardActions sx={{ paddingLeft: "2%", paddingBottom: "1.5%" }}>
							<IconButton size="small" onClick={handleCopyToClipboard}>
								<ContentCopy color="secondary" />
							</IconButton>
							<IconButton size="small" onClick={handleOpenLink}>
								<OpenInNew color="secondary" />
							</IconButton>
							<IconButton size="small" onClick={handleClose}>
								<Close color="secondary" />
							</IconButton>
						</CardActions>
					</Stack>
					<CardContent sx={{ marginTop: "-3%" }}>
						<Typography gutterBottom variant="h5" component="div">
							{title}
						</Typography>
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{ position: "static", overflowY: "scroll", height: 500 }}
						>
							{description}
						</Typography>
					</CardContent>
				</Card>
			</Modal>
		</div>
	)
}
