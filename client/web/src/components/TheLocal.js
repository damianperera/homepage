import * as React from "react"
import { Newspaper } from "@mui/icons-material"
import { Box, Stack, Tooltip } from "@mui/material"
import { Item, DataGrid, Modal, AppContext, OpenGraphMeta, Alert, DataGridLoader } from "../common"
import parse from "html-react-parser"

function LocalNews() {
	const defaultCountry = "Europe"
	const defaultCountryTld = ".com"
	const deeplinkUrl = "https://damianperera.github.io/homepage?t="

	const [latestPosts, setLatestPosts] = React.useState([])
	const [latestPostsGridLoading, setLatestPostsGridLoading] = React.useState(true)
	const [modalOpen, setModalOpen] = React.useState(false)
	const [modalTitle, setModalTitle] = React.useState()
	const [modalDescription, setModalDescription] = React.useState()
	const [modalSourceUrl, setModalSourceUrl] = React.useState()
	const [modalDeeplinkUrl, setModalDeeplinkUrl] = React.useState()
	const [modalImage, setModalImage] = React.useState()
	const [context] = React.useContext(AppContext)
	const [country, setCountry] = React.useState(defaultCountry)
	const [countryTld, setCountryTld] = React.useState(defaultCountryTld)
	const [documentMeta, setDocumentMeta] = React.useState()
	const [alertOpen, setAlertOpen] = React.useState(false)
	const [alertProps, setAlertProps] = React.useState({
		message: null,
		severity: "error",
	})

	React.useEffect(() => {
		const supportedCountryTlds = [".at", ".dk", ".fr", ".it", ".no", ".es", ".se", ".ch"]

		if (supportedCountryTlds.includes(context.geoData.countryTld)) {
			setCountryTld(context.geoData.countryTld)
			setCountry(context.geoData.country)
		} else {
			setCountry(defaultCountry)
		}
	}, [context])

	React.useEffect(() => {
		setLatestPostsGridLoading(true)

		const fetchData = async () => {
			try {
				const response = await (await fetch(getStoriesUrl(countryTld))).json()
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

				const queryParams = new URLSearchParams(window.location.search)
				var deeplinkTarget = queryParams.get("t") ?? null

				if (deeplinkTarget) {
					deeplinkTarget = parseInt(deeplinkTarget)

					const targetRecord = formattedResponse.find((record) => record.id === deeplinkTarget)
					targetRecord
						? handleDeeplink(targetRecord)
						: handleError("Could not find the requested article", targetRecord)
				}
			} catch (error) {
				handleError(
					"Could not fetch data for the The Local news - refresh the page to try again",
					error
				)
			}
		}

		const handleDeeplink = async (record) => {
			handlePostClick({ row: record })
		}

		const handleError = async (message, error) => {
			console.error(message, error)
			setAlertProps({ ...alertProps, message })
			setAlertOpen(true)
		}

		fetchData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [countryTld])

	const getStoriesUrl = (countryTld) => {
		return `https://www.thelocal${countryTld}/wp-json/wp/v2/posts?per_page=50&orderby=date&order=desc`
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
		setModalSourceUrl(record.row.guid.rendered)
		setModalDeeplinkUrl(`${deeplinkUrl}${record.row.id}`)

		setDocumentMeta({
			title: record.row.gridRow.title,
			description: record.row.gridRow.summary,
			type: "article",
			link: `${deeplinkUrl}${record.row.id}`,
		})

		setModalOpen(true)
	}

	return (
		<Item>
			<Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
				<Newspaper />
				<h3>The Local - {country}</h3>
			</Stack>
			<Box sx={{ height: 670, width: "100%", flex: 1, display: "flex" }}>
				{documentMeta && modalOpen && <OpenGraphMeta {...documentMeta} />}
				<Modal
					open={modalOpen}
					setOpen={setModalOpen}
					title={modalTitle}
					description={modalDescription}
					sourceUrl={modalSourceUrl}
					deeplinkUrl={modalDeeplinkUrl}
					featuredImageUrl={modalImage}
				/>
				<Alert {...alertProps} open={alertOpen} onClose={() => setAlertOpen(false)} />
				<DataGrid
					rows={latestPosts}
					columns={topStoriesColumns}
					onRowClick={handlePostClick}
					hideFooter
					loading={latestPostsGridLoading}
					disableColumnSelector
					components={{
						LoadingOverlay: DataGridLoader,
					}}
				/>
			</Box>
		</Item>
	)
}

export default LocalNews
