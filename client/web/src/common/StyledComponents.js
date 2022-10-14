import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { Paper } from "@mui/material";

export const StyledItem = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    })
);

export const StyledDataGrid = styled(DataGrid)(() => ({
        "& .MuiDataGrid-columnHeaders": { display: "none" },
        "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
        "& .MuiDataGrid-row:hover": { cursor: "pointer" }
    })
);