import * as React from "react";
import { Newspaper } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { Item, DataGrid, Modal } from "../common";
import parse from 'html-react-parser';

function LocalNews() {
    const [latestPosts, setLatestPosts] = React.useState([]);
    const [latestPostsGridLoading, setLatestPostsGridLoading] = React.useState(true);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [modalTitle, setModalTitle] = React.useState();
    const [modalDescription, setModalDescription] = React.useState();
  
    React.useEffect(() => {
      const topStoriesURL = "https://www.thelocal.de/wp-json/wp/v2/posts?per_page=50";
  
      const fetchData = async () => {
        try {
          const response = await (await fetch(topStoriesURL)).json();
          const formattedResponse = response.map((record) => {
            record.title = parse(record.title.rendered);
            record.description = parse(record.content.rendered);
            return record;
          })

          setLatestPostsGridLoading(false);
          setLatestPosts(formattedResponse);
        } catch (error) {
          console.error("Network Error", error);
        }
      };
  
      fetchData();
    }, []);
  
    const topStoriesColumns = [
      {
        field: "title",
        headerName: "Title",
        width: "530",
        editable: false
      }
    ];
  
    const handleTopStoryClick = (record) => {
        setModalTitle(record.row.title);
        setModalDescription(record.row.description);
        setModalOpen(true);
    }
  
    return (
      <Item>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
          <Newspaper /><h3>The Local DE</h3>
        </Stack>
        <Box sx={{ height: 650, width: "100%", flex: 1, display: "flex" }}>
            <Modal
                open={modalOpen}
                setOpen={setModalOpen}
                title={modalTitle}
                description={modalDescription}
            />
            <DataGrid
                rows={latestPosts}
                columns={topStoriesColumns}
                onRowClick={handleTopStoryClick}
                hideFooter
                loading={latestPostsGridLoading}
                disableColumnSelector
                sx={{
                "& .MuiDataGrid-virtualScroller": {
                    height: 650
                }
                }}
            />
        </Box>
      </Item>
    );
}

export default LocalNews;