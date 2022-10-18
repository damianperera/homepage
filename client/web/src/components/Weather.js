import * as React from "react"
import { Stack, CircularProgress } from "@mui/material"
import { AppContext } from "../common"

function Weather() {
	const [context] = React.useContext(AppContext)
	const [widgetUrl, setWidgetUrl] = React.useState()

	React.useEffect(() => {
		const getWidgetUrl = async () => {
			try {
				const geoLocation = encodeURIComponent(
					`${context.geoData.city}, ${context.geoData.country}`
				)
				const geoResults = await (
					await fetch(
						`https://api.opencagedata.com/geocode/v1/json?q=${geoLocation}&key=3af9a6c5867846eb9eb04549821d92a7`
					)
				).json()
				const coordinates = geoResults.results[0].geometry
				console.log(coordinates)

				const formattedPath = (() => {
					const lat = coordinates.lat.toFixed(2).toString().replace(".", "d").replace("-", "n")
					const lng = coordinates.lng.toFixed(2).toString().replace(".", "d").replace("-", "n")
					return `${lat}${lng}`
				})()

				const formattedUrl = `https://forecast7.com/en/${formattedPath}/${context.geoData.city.toLowerCase()}`

				setWidgetUrl(formattedUrl)
			} catch (error) {
				console.error(`Error fetching weather information, hiding weather widget`, error)
				setWidgetUrl(null)
			}
		}

		getWidgetUrl()
	}, [context.geoData])

	console.log(widgetUrl)

	const Widget = () => {
		return (
			<a
				className="weatherwidget-io"
				href={widgetUrl}
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

	return (
		<Widget />
		// <a
		// 	className="weatherwidget-io"
		// 	href="https://forecast7.com/en/48d1411d58/munich/"
		// 	data-label_1="München"
		// 	data-label_2="Deutschland"
		// 	data-theme="dark"
		// 	data-basecolor="#121212"
		// 	data-icons="Climacons Animated"
		// 	style={{
		// 		textDecoration: "none",
		// 		color: "white",
		// 		pointerEvents: "none",
		// 	}}
		// >
		// 	<Stack
		// 		direction="row"
		// 		alignItems="center"
		// 		justifyContent="center"
		// 		gap={1}
		// 		sx={{ paddingTop: "2%" }}
		// 	>
		// 		<CircularProgress size={25} /> Loading Weather for {context.geoData.city}
		// 	</Stack>
		// </a>
	)
}

export default Weather
