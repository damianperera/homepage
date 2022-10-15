import { Stack, CircularProgress } from "@mui/material"

function Weather() {
	return (
		<a
			className="weatherwidget-io"
			href="https://forecast7.com/en/48d1411d58/munich/"
			data-label_1="MÜNCHEN"
			data-label_2="BAYERN DE"
			data-theme="dark"
			data-basecolor="#121212"
			data-icons="Climacons Animated"
			style={{
				textDecoration: "none",
				color: "white",
				pointerEvents: "none",
			}}
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="center"
				gap={1}
				sx={{ paddingTop: "2%" }}
			>
				<CircularProgress size={25} /> Loading Weather
			</Stack>
		</a>
	)
}

export default Weather
