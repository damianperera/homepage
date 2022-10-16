import * as React from "react"
import { Engineering } from "@mui/icons-material"
import { Box, Stack, Tooltip } from "@mui/material"
import { Item, DataGrid, Modal } from "../common"
import parse from "html-react-parser"

function PragmaticEngineer() {
	const [latestPosts, setLatestPosts] = React.useState([])
	const [latestPostsGridLoading, setLatestPostsGridLoading] = React.useState(true)
	const [modalOpen, setModalOpen] = React.useState(false)
	const [modalTitle, setModalTitle] = React.useState()
	const [modalDescription, setModalDescription] = React.useState()
	const [modalLink, setModalLink] = React.useState()

	React.useEffect(() => {
		const topStoriesURL =
			"https://damianperera.github.io/homepage/static/data/pragmaticEngineer.json"

		const fetchData = async () => {
			try {
				const response = await (await fetch(topStoriesURL)).json()
				const formattedResponse = response.items.map((record) => {
					record.id = crypto.randomUUID()
					record.content = parse(record.content_html)
					record.gridRow = { title: record.title, summary: parse(record.summary) }
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
			field: "gridRow",
			headerName: "Title",
			width: "530",
			editable: false,
			renderCell: (params) => (
				<Tooltip title={params.row.summary}>
					<span className="table-cell-trucate">{params.row.title}</span>
				</Tooltip>
			),
		},
	]

	const handlePostClick = async (record) => {
		setModalTitle(record.row.title)
		setModalDescription(record.row.content)
		setModalLink(record.row.url)

		setModalOpen(true)
	}

	return (
		<Item>
			<Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
				<Engineering />
				<h3>The Pragmatic Engineer</h3>
			</Stack>
			<Box sx={{ height: 670, width: "100%", flex: 1, display: "flex" }}>
				<Modal
					open={modalOpen}
					setOpen={setModalOpen}
					title={modalTitle}
					description={modalDescription}
					sourceUrl={modalLink}
					featuredImageUrl={null}
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

export default PragmaticEngineer
