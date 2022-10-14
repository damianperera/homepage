import * as React from "react";
import { Newspaper } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { StyledItem, StyledDataGrid } from "../common/StyledComponents";

function HackerNewsTopStories() {
    const [topStories, setTopStories] = React.useState([]);
    const [topStoriesGridLoading, setTopStoriesGridLoading] = React.useState(true);
  
    // Top Story Loader
    React.useEffect(() => {
      const topStoriesURL = "https://hacker-news.firebaseio.com/v0/topstories.json";
      const itemStoryURL = "https://hacker-news.firebaseio.com/v0/item";
  
      const fetchData = async () => {
        try {
          const response = await (await fetch(topStoriesURL)).json();
          const storyURLS = response.slice(0, 30).map(id => `${itemStoryURL}/${id}.json`);
          const requests = storyURLS.map(id => async () => await (await fetch(id)).json());
          const stories = await Promise.all(requests.map(f => f()));
          const updatedStories = stories.map(story => {
            // story.title = `"${story.title}" by ${story.by}`;
            return story;
          })
  
          setTopStoriesGridLoading(false);
          setTopStories(updatedStories);
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
        width: "525",
        editable: false
      }
    ];
  
    const handleTopStoryClick = (record) => {
      window.open(record.row.url, "_blank", "noopener,noreferrer");
    }
  
    return (
      <StyledItem>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
          <Newspaper /><h3>HackerNews Top Stories</h3>
        </Stack>
        <Box sx={{ height: 650, width: "100%", flex: 1, display: "flex" }}>
          <StyledDataGrid
            rows={topStories}
            columns={topStoriesColumns}
            onRowClick={handleTopStoryClick}
            hideFooter
            loading={topStoriesGridLoading}
            disableColumnSelector
            sx={{
              "& .MuiDataGrid-virtualScroller": {
                height: 650
              }
            }}
          />
        </Box>
      </StyledItem>
    );
}

export default HackerNewsTopStories;