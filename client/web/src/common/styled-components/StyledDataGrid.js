import { styled } from "@mui/material/styles"
import { Box, Skeleton } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"

export const StyledDataGrid = styled(DataGrid)(() => ({
	"& .MuiDataGrid-columnHeaders": { display: "none" },
	"& .MuiDataGrid-virtualScroller": {
		marginTop: "0 !important",
		height: "670px !important",
		msOverflowStyle: "none",
		scrollbarWidth: "none",
	},
	"& .MuiDataGrid-row:hover": { cursor: "pointer" },
	"& .MuiDataGrid-virtualScroller::-webkit-scrollbar": { display: "none" },
	"& .MuiDataGrid-cell:focus": { outline: "unset !important" },
}))

export const StyledDataGridLoader = () => (
	<Box
		sx={{
			height: "max-content",
			marginTop: -7,
		}}
	>
		{[...Array(25)].map((_) => (
			<Skeleton variant="rectangular" animation="wave" sx={{ my: 0.5, mx: 0.6, height: 45 }} />
		))}
	</Box>
)
