import * as React from "react"
import { Public } from "@mui/icons-material"
import { Box, Stack } from "@mui/material"
import { Item, DataGrid } from "../common"

function HackerNewsTopStories() {
	const [topStories, setTopStories] = React.useState([])
	const [topStoriesGridLoading, setTopStoriesGridLoading] = React.useState(true)

	React.useEffect(() => {
		const topStoriesURL = "https://hacker-news.firebaseio.com/v0/topstories.json"
		const itemStoryURL = "https://hacker-news.firebaseio.com/v0/item"

		setTopStoriesGridLoading(true)

		const fetchData = async () => {
			try {
				const response = await (await fetch(topStoriesURL)).json()
				const storyURLS = response.slice(0, 30).map((id) => `${itemStoryURL}/${id}.json`)
				const requests = storyURLS.map((id) => async () => await (await fetch(id)).json())
				const stories = await Promise.all(requests.map((f) => f()))
				const updatedStories = stories.map((story) => {
					return story
				})

				setTopStoriesGridLoading(false)
				setTopStories(updatedStories)
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
			flex: 1,
			editable: false,
		},
	]

	const handleTopStoryClick = (record) => {
		window.open(record.row.url, "_blank", "noopener,noreferrer")
	}

	return (
		<Item>
			<Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
				<Public />
				<h3>HackerNews Top Stories</h3>
			</Stack>
			<Box sx={{ height: 670, width: "100%", flex: 1, display: "flex" }}>
				<DataGrid
					rows={topStories}
					columns={topStoriesColumns}
					onRowClick={handleTopStoryClick}
					hideFooter
					loading={topStoriesGridLoading}
					disableColumnSelector
				/>
			</Box>
		</Item>
	)
}

export default HackerNewsTopStories
