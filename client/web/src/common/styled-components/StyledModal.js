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

export function StyledModal({
	title,
	description,
	open,
	setOpen,
	sourceUrl,
	featuredImageUrl,
	actionButtonColor,
}) {
	const cardHeight = featuredImageUrl ? { maxHeight: "90%" } : { maxHeight: 900 }
	const contentHeight = featuredImageUrl ? { maxHeight: 600 } : { maxHeight: 770 }

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "background.paper",
		width: "70%",
		...cardHeight,
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
		".ng-star-inserted": {
			fontStyle: "italic",
			fontSize: 12,
		},
		figcaption: {
			fontStyle: "italic",
			fontSize: 12,
		},
		"& .elementor *": {
			// fix for thelocal.de in-line style overrides for the elementor widget
			color: "inherit !important",
			font: "inherit !important",
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
				<Card sx={{ ...style }}>
					{featuredImageUrl && (
						<div>
							<CardMedia component="img" height="200" image={featuredImageUrl} />
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="center"
								gap={1}
								sx={{
									position: "absolute",
									top: 5,
									right: 5,
									bgcolor: "rgba(0, 0, 0, 0.2)",
									borderRadius: 1.5,
								}}
							>
								<CardActions>
									<Tooltip title="Copy Link">
										<IconButton size="small" onClick={handleCopyToClipboard}>
											{actionButtonColor ? (
												<ContentCopy color={actionButtonColor} />
											) : (
												<ContentCopy />
											)}
										</IconButton>
									</Tooltip>
									<Tooltip title="Open in Source">
										<IconButton size="small" onClick={handleOpenLink}>
											{actionButtonColor ? <OpenInNew color={actionButtonColor} /> : <OpenInNew />}
										</IconButton>
									</Tooltip>
									<Tooltip title="Close">
										<IconButton size="small" onClick={handleClose}>
											{actionButtonColor ? <Close color={actionButtonColor} /> : <Close />}
										</IconButton>
									</Tooltip>
								</CardActions>
							</Stack>
						</div>
					)}
					<CardContent>
						<Typography
							gutterBottom
							variant="h5"
							component="div"
							sx={{ borderBottom: "1px solid rgba(81, 81, 81, 1)", paddingBottom: 1 }}
						>
							{featuredImageUrl && title}
							{!featuredImageUrl && (
								<Stack direction="row" alignItems="center" justifyContent="space-between">
									{title}
									<CardActions>
										<Tooltip title="Copy Link">
											<IconButton size="small" onClick={handleCopyToClipboard}>
												<ContentCopy color="disabled" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Open in Source">
											<IconButton size="small" onClick={handleOpenLink}>
												<OpenInNew color="disabled" />
											</IconButton>
										</Tooltip>
										<Tooltip title="Close">
											<IconButton size="small" onClick={handleClose}>
												<Close color="disabled" />
											</IconButton>
										</Tooltip>
									</CardActions>
								</Stack>
							)}
						</Typography>
						<Typography
							variant="body1"
							color="text.secondary"
							sx={{
								position: "static",
								overflowY: "scroll",
								...contentHeight,
								"::-webkit-scrollbar": { display: "none" },
								msOverflowStyle: "none",
								scrollbarWidth: "none",
							}}
							paragraph={false}
							children={description}
							align="justify"
							component="div"
						/>
					</CardContent>
				</Card>
			</Modal>
		</div>
	)
}
