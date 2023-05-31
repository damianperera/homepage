import * as React from "react"
import { Stack, CircularProgress } from "@mui/material"
import { AppContext, Alert } from "../common"

function Weather() {
	const [context] = React.useContext(AppContext)
	const [widgetUrl, setWidgetUrl] = React.useState()
	const [alertOpen, setAlertOpen] = React.useState(false)
	const [alertProps, setAlertProps] = React.useState({
		message: null,
		severity: "error",
	})

	const weatherScriptHTML =
		'!(function (d, s, id) {\n  var js,\n    fjs = d.getElementsByTagName(s)[0]\n  if (!d.getElementById(id)) {\n    js = d.createElement(s)\n    js.id = id\n    js.src = "https://weatherwidget.io/js/widget.min.js"\n    fjs.parentNode.insertBefore(js, fjs)\n  }\n})(document, "script", "weatherwidget-io-js")'

	React.useEffect(() => {
		const widgetScript = (() => {
			const weatherWidgetScript = document.createElement("script")
			weatherWidgetScript.type = "text/javascript"
			weatherWidgetScript.id = "weather-widget-script"
			weatherWidgetScript.async = true
			weatherWidgetScript.innerHTML = weatherScriptHTML
			return weatherWidgetScript
		})()

		const unloadWidgetScript = () => {
			const existingScript = document.getElementById("weather-widget-script")
			existingScript && document.body.removeChild(existingScript)
		}

		const loadWidgetScript = () => {
			document.body.appendChild(widgetScript)
		}

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

				const formattedPath = (() => {
					const lat = coordinates.lat.toFixed(2).toString().replace(".", "d").replace("-", "n")
					const lng = coordinates.lng.toFixed(2).toString().replace(".", "d").replace("-", "n")
					return `${lat}${lng}`
				})()

				const formattedUrl = `https://forecast7.com/en/${formattedPath}/${context.geoData.city.toLowerCase()}/`

				unloadWidgetScript()
				loadWidgetScript()
				setWidgetUrl(formattedUrl)
			} catch (error) {
				handleError("Could not fetch weather information")
			}
		}

		const handleError = async (message) => {
			console.error(message)
			setAlertProps({ ...alertProps, message })
			setAlertOpen(true)
			unloadWidgetScript()
			setWidgetUrl(null)
		}

		getWidgetUrl()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context])

	return (
		widgetUrl && (
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
				<Alert {...alertProps} open={alertOpen} onClose={() => setAlertOpen(false)} />
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
	)
}

export default Weather
