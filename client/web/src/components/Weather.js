import * as React from "react"
import { Stack, CircularProgress } from "@mui/material"
import { AppContext } from "../common"

function Weather() {
	const [context] = React.useContext(AppContext)

	return (
		<a
			className="weatherwidget-io"
			href="https://forecast7.com/en/48d1411d58/munich/"
			data-label_1={context.geoData.city}
			data-label_2={context.geoData.country}
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
				<CircularProgress size={25} /> Loading Weather for {context.geoData.city}
			</Stack>
		</a>
	)
}

export default Weather
