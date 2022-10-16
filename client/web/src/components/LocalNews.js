import * as React from "react"
import { Newspaper } from "@mui/icons-material"
import { Box, Stack, Tooltip } from "@mui/material"
import { Item, DataGrid, Modal, AppContext } from "../common"
import parse from "html-react-parser"

function LocalNews() {
	const defaultCountry = "Europe"

	const [latestPosts, setLatestPosts] = React.useState([])
	const [latestPostsGridLoading, setLatestPostsGridLoading] = React.useState(true)
	const [modalOpen, setModalOpen] = React.useState(false)
	const [modalTitle, setModalTitle] = React.useState()
	const [modalDescription, setModalDescription] = React.useState()
	const [modalLink, setModalLink] = React.useState()
	const [modalImage, setModalImage] = React.useState()
	const [country, setCountry] = React.useState(defaultCountry)
	const [dataLoad] = React.useContext(AppContext)

	React.useEffect(() => {
		const geolocationUrl = "http://ip-api.com/json/?fields=country,countryCode"
		const supportedCountryCodes = ["de", "at", "dk", "fr", "it", "no", "es", "se", "ch"]
		const defaultCountryCode = "com"

		setLatestPostsGridLoading(true)

		const fetchData = async () => {
			var geoData = {}

			try {
				geoData = await (await fetch(geolocationUrl)).json()
				geoData.countryCode = geoData.countryCode.toLowerCase()
			} catch (error) {
				console.error(`Network error trying to fetch GeoIP - defaulting to ${defaultCountry}`)
			}

			var countryCode = defaultCountryCode

			if (supportedCountryCodes.includes(geoData.countryCode)) {
				countryCode = geoData.countryCode
				setCountry(geoData.country)
			}

			try {
				const response = await (await fetch(getStoriesUrl(countryCode))).json()
				const formattedResponse = response.map((record) => {
					record.description = parse(record.content.rendered)
					record.gridRow = {
						title: parse(record.title.rendered),
						summary: parse(record.excerpt.rendered),
					}
					return record
				})
				setLatestPostsGridLoading(false)
				setLatestPosts(formattedResponse)
			} catch (error) {
				console.error(
					"Network error trying to load Local News - please refresh the page to try again"
				)
			}
		}

		fetchData()
	}, [dataLoad])

	const getStoriesUrl = (domainCode) => {
		return `https://www.thelocal.${domainCode}/wp-json/wp/v2/posts?per_page=50&orderby=date&order=desc`
	}

	const topStoriesColumns = [
		{
			field: "gridRow",
			flex: 1,
			editable: false,
			renderCell: (params) => (
				<Tooltip title={params.row.gridRow.summary}>
					<div className="MuiDataGrid-cellContent">{params.row.gridRow.title}</div>
				</Tooltip>
			),
		},
	]

	const handlePostClick = async (record) => {
		const mediaUrl = record.row["_links"]["wp:attachment"][0].href
		const media = await (await fetch(mediaUrl)).json()

		if (Array.isArray(media) && media.length > 0) {
			const imageUrl = media[0].guid.rendered
			setModalImage(imageUrl)
		} else {
			setModalImage(null)
		}

		setModalTitle(record.row.gridRow.title)
		setModalDescription(record.row.description)
		setModalLink(record.row.guid.rendered)

		setModalOpen(true)
	}

	return (
		<Item>
			<Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
				<Newspaper />
				<h3>Local News - {country}</h3>
			</Stack>
			<Box sx={{ height: 670, width: "100%", flex: 1, display: "flex" }}>
				<Modal
					open={modalOpen}
					setOpen={setModalOpen}
					title={modalTitle}
					description={modalDescription}
					sourceUrl={modalLink}
					featuredImageUrl={modalImage}
				/>
				<DataGrid
					rows={latestPosts}
					columns={topStoriesColumns}
					onRowClick={handlePostClick}
					hideFooter
					loading={latestPostsGridLoading}
					disableColumnSelector
				/>
			</Box>
		</Item>
	)
}

export default LocalNews
