import * as React from "react"
import { Newspaper } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import { Item, DataGrid, Modal } from "../common"
import parse from "html-react-parser"

function PragmaticEngineer() {
	const [latestPosts, setLatestPosts] = React.useState([])
	const [latestPostsGridLoading, setLatestPostsGridLoading] = React.useState(true)
	const [modalOpen, setModalOpen] = React.useState(false)
	const [modalTitle, setModalTitle] = React.useState()
	const [modalDescription, setModalDescription] = React.useState()
	const [modalLink, setModalLink] = React.useState()
	const [modalImage, setModalImage] = React.useState(null)

	React.useEffect(() => {
		const topStoriesURL =
			"https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnewsletter.pragmaticengineer.com%2Ffeed"

		const fetchData = async () => {
			try {
				const response = await (await fetch(topStoriesURL)).json()
				const formattedResponse = response.items.map((record) => {
					record.id = crypto.randomUUID()
					record.content = parse(record.content)
					return record
				})
				setLatestPostsGridLoading(false)
				setLatestPosts(formattedResponse)
			} catch (error) {
				console.error("Network Error", error)
			}
		}

		fetchData()
	}, [])

	const topStoriesColumns = [
		{
			field: "title",
			headerName: "Title",
			width: "530",
			editable: false,
		},
	]

	const handlePostClick = async (record) => {
		setModalTitle(record.row.title)
		setModalDescription(record.row.content)
		setModalLink(record.row.link)
		setModalImage(record.row.enclosure.link)

		setModalOpen(true)
	}

	return (
		<Item>
			<Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
				<Newspaper />
				<h3>The Pragmatic Engineer</h3>
			</Stack>
			<Box sx={{ height: 650, width: "100%", flex: 1, display: "flex" }}>
				<Modal
					open={modalOpen}
					setOpen={setModalOpen}
					title={modalTitle}
					description={modalDescription}
					sourceUrl={modalLink}
					featuredImageUrl={modalImage}
					actionButtonColor="disabled"
				/>
				<DataGrid
					rows={latestPosts}
					columns={topStoriesColumns}
					onRowClick={handlePostClick}
					hideFooter
					loading={latestPostsGridLoading}
					disableColumnSelector
					sx={{
						"& .MuiDataGrid-virtualScroller": {
							height: 650,
						},
					}}
				/>
			</Box>
		</Item>
	)
}

export default PragmaticEngineer
