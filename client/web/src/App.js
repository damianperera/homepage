import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Google, Code, PrivacyTip, Newspaper } from "@mui/icons-material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { Box, TextField, FormControl, Stack , AppBar, Toolbar, IconButton, CssBaseline, MenuItem, InputAdornment, Select, Paper, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  const googleSearchURL = "https://www.google.com/search";
  const stackOverflowSearchURL = "https://stackoverflow.com/search";
  const duckDuckGoSearchURL = "https://duckduckgo.com";

  const [searchEngine, setSearchEngine] = React.useState(googleSearchURL);
  const [topStories, setTopStories] = React.useState([]);

  React.useEffect(() => {
    const topStoriesURL = "https://hacker-news.firebaseio.com/v0/topstories.json";
    const itemStoryURL = "https://hacker-news.firebaseio.com/v0/item/";
  
    const fetchData = async () => {
      try {
        const response = await (await fetch(topStoriesURL)).json();
        const storyURLS = response.slice(0, 30).map(id => itemStoryURL + id + ".json");
        const requests = storyURLS.map(id => async () => await (await fetch(id)).json());
        const stories = await Promise.all(requests.map(f => f()));
        const updatedStories = stories.map(story => {
          // story.title = `"${story.title}" by ${story.by}`;
          return story;
        })

        setTopStories(updatedStories);
      } catch (error) {
        console.error("Network Error", error);
      }
    };
  
    fetchData();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": { display: "none" },
    "& .MuiDataGrid-virtualScroller": { marginTop: "0!important" },
    "& .MuiDataGrid-row:hover": { cursor: "pointer" }
  }));
  
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: "600",
      editable: false
    }
  ];

    const handleChange = (event) => {
    setSearchEngine(event.target.value);
  };
  
  const handleTopStoryClick = (record) => {
    window.open(record.row.url, "_blank", "noopener,noreferrer");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ height: "10vh" }}>
            <Box 
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <form action={searchEngine}>
                <FormControl variant="standard">
                  <TextField autoFocus name="q" required id="search" placeholder="Enter search text" variant="outlined" 
                    sx={{ 
                      width: "70vh",
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          border: 0
                        }
                      }
                    }} 
                    InputProps={{
                      startAdornment: 
                        <InputAdornment position="start">
                          <Select 
                            labelId="search-engine-label" 
                            id="search-engine" 
                            value={searchEngine} 
                            onChange={handleChange}
                            sx={{
                              boxShadow: "none",
                              ".MuiOutlinedInput-notchedOutline": { border: 0 },
                              marginLeft: -2,
                              marginRight: 2,
                              width: "19vh"
                            }}
                          >
                            <MenuItem value={googleSearchURL}>
                              <Stack direction="row" alignItems="center" gap={1}>
                                <Google /> Google
                              </Stack>
                            </MenuItem>
                            <MenuItem value={stackOverflowSearchURL}>
                              <Stack direction="row" alignItems="center" gap={1}>
                                <Code /> StackOverflow
                              </Stack>    
                            </MenuItem>
                            <MenuItem value={duckDuckGoSearchURL}>
                              <Stack direction="row" alignItems="center" gap={1}>
                                <PrivacyTip /> DuckDuckGo
                              </Stack>    
                            </MenuItem>
                          </Select>
                        </InputAdornment>,
                      endAdornment: 
                          <IconButton type="submit" aria-label="search" size="small"><SearchIcon /></IconButton>
                    }}
                    />
                </FormControl>
              </form>
            </Box>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, padding: 3 }}>
          <Grid container spacing={2} columns={10}>
            <Grid item xs={4}>
              <Item>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Newspaper /><h3>HackerNews Top Stories</h3>
                </Stack>
                <Box sx={{ height: 350, width: "100%" }}>
                  <StyledDataGrid
                    rows={topStories}
                    columns={columns}
                    onRowClick={handleTopStoryClick}
                    hideFooter
                  />
                </Box>
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>Coming Soon</Item>
            </Grid>
          </Grid>
        </Box>
    </ThemeProvider>
  );
}

export default App;
