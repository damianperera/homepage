import { styled } from "@mui/material/styles"
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
}))
