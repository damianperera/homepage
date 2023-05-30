/**
 * @license
 * MIT License
 *
 * Copyright (c) 2022 Damian Perera
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/

import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "./App.css"
import * as React from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Box, CssBaseline, Grid } from "@mui/material"
import { Header, Weather, PragmaticEngineer, HackerNewsTopStories, TheLocal } from "./components"
import { AppContext } from "./common"
import { Helmet } from "react-helmet"

function App() {
	const [context, setContext] = React.useState({
		geoData: {
			city: "Munich",
			country: "Germany",
			countryTld: ".de",
			countryCode: "DE",
		},
		dataLoad: true,
	})

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
		},
	})

	React.useEffect(() => {
		const geolocationUrl = "https://ipapi.co/json"

		const fetchData = async () => {
			try {
				const res = await (await fetch(geolocationUrl)).json()

				const geoData = {
					city: res["city"],
					country: res["country_name"],
					countryTld: res["country_tld"].toLowerCase(),
					countryCode: res["country_code"],
					latitude: res["latitude"],
					longitude: res["longitude"],
				}

				setContext({ ...context, geoData })
			} catch (error) {
				console.error(
					`Network error trying to fetch GeoIP - defaulting to ${context.geoData.country}`,
					error
				)
			}
		}

		fetchData()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<AppContext.Provider value={[context, setContext]}>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Dev Homepage</title>
				<link rel="canonical" href="https://damianperera.github.io/homepage" />
				<meta name="description" content="A replacement browser homepage for developers" />
			</Helmet>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Header />
				<Box sx={{ flexGrow: 1, padding: 2 }}>
					<Grid container spacing={2} columns={12}>
						<Grid item xs={12}>
							<Box sx={{ height: 100 }}>
								<Weather />
							</Box>
						</Grid>
						<Grid item xs={4}>
							<PragmaticEngineer />
						</Grid>
						<Grid item xs={4}>
							<HackerNewsTopStories />
						</Grid>
						<Grid item xs={4}>
							<TheLocal />
						</Grid>
					</Grid>
				</Box>
			</ThemeProvider>
		</AppContext.Provider>
	)
}

export default App
