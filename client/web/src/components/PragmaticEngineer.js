import * as React from "react"
import { Engineering, Redeem } from "@mui/icons-material"
import { Box, Stack, Tooltip, Chip } from "@mui/material"
import { Item, DataGrid, Modal, AppContext, Alert, DataGridLoader, OpenGraphMeta } from "../common"
import parse from "html-react-parser"

function PragmaticEngineer() {
	const [latestPosts, setLatestPosts] = React.useState([])
	const [latestPostsGridLoading, setLatestPostsGridLoading] = React.useState(true)
	const [modalOpen, setModalOpen] = React.useState(false)
	const [modalTitle, setModalTitle] = React.useState()
	const [modalDescription, setModalDescription] = React.useState()
	const [modalLink, setModalLink] = React.useState()
	const [context] = React.useContext(AppContext)
	const [documentMeta, setDocumentMeta] = React.useState()
	const [alertOpen, setAlertOpen] = React.useState(false)
	const [alertProps, setAlertProps] = React.useState({
		message: null,
		severity: "error",
	})
	const freeIcon = <Chip icon={<Redeem />} label="Free" size="small" />

	React.useEffect(() => {
		const topStoriesURL =
			"https://damianperera.github.io/homepage/static/data/pragmaticEngineer.json"
		const isFreeText = "free issue of the Pragmatic Engineer Newsletter"

		setLatestPostsGridLoading(true)

		const fetchData = async () => {
			try {
				const response = await (await fetch(topStoriesURL)).json()
				const formattedResponse = response.items.map((record) => {
					record.id = crypto.randomUUID()
					record.content = parse(record.content_html)
					record.gridRow = {
						title: parse(record.title),
						summary: parse(record.summary),
						isFree: record.content_html.includes(isFreeText),
					}
					return record
				})

				setLatestPostsGridLoading(false)
				setLatestPosts(formattedResponse)
			} catch (error) {
				handleError(
					"Could not fetch data for the Pragmatic Engineer - refresh the page to try again",
					error
				)
			}
		}

		const handleError = async (message, error) => {
			console.error(message, error)
			setAlertProps({ ...alertProps, message })
			setAlertOpen(true)
		}

		fetchData()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [context.dataLoad])

	const topStoriesColumns = [
		{
			field: "gridRow",
			flex: 1,
			editable: false,
			renderCell: (params) => (
				<Tooltip title={params.row.gridRow.summary}>
					<div className="MuiDataGrid-cellContent">
						{params.row.gridRow.isFree && freeIcon} {params.row.gridRow.title}
					</div>
				</Tooltip>
			),
		},
	]

	const handlePostClick = async (record) => {
		setModalTitle(record.row.title)
		setModalDescription(record.row.content)
		setModalLink(record.row.url)

		setDocumentMeta({
			title: record.row.title,
			description: record.row.gridRow.summary,
			type: "article",
		})

		setModalOpen(true)
	}

	return (
		<Item>
			<Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
				<Engineering />
				<h3>The Pragmatic Engineer</h3>
			</Stack>
			<Box sx={{ height: 670, width: "100%", flex: 1, display: "flex" }}>
				{documentMeta && modalOpen && <OpenGraphMeta {...documentMeta} />}
				<Modal
					open={modalOpen}
					setOpen={setModalOpen}
					title={modalTitle}
					description={modalDescription}
					sourceUrl={modalLink}
					featuredImageUrl={null}
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

export default PragmaticEngineer
