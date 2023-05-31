import { Snackbar, Alert as MuiAlert } from "@mui/material"

export const Alert = ({ message, open, onClose, severity, autoHideDuration = 6000 }) => (
	<Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
		<MuiAlert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
			{message}
		</MuiAlert>
	</Snackbar>
)
