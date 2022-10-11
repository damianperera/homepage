import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import * as React from "react";
import { Google, Code, PrivacyTip, Newspaper, Search, Menu, KeyRounded, GitHub } from "@mui/icons-material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { Box, TextField, FormControl, Stack , AppBar, Toolbar, IconButton, CssBaseline, MenuItem, InputAdornment, Select, Paper, Grid, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  const googleSearchURL = "https://www.google.com/search";
  const stackOverflowSearchURL = "https://stackoverflow.com/search";
  const duckDuckGoSearchURL = "https://duckduckgo.com";
  const licenseURL = "https://github.com/damianperera/homepage/blob/main/LICENSE.md";
  const repositoryURL = "https://github.com/damianperera/homepage";

  const [searchEngine, setSearchEngine] = React.useState(googleSearchURL);
  const [topStories, setTopStories] = React.useState([]);
  const [topStoriesGridLoading, setTopStoriesGridLoading] = React.useState(true);
  const [menuToggle, setMenuToggle] = React.useState(false);

  const toggleMenu = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setMenuToggle(open);
  };

  // Top Story Loader
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

        setTopStoriesGridLoading(false);
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
  
  const StyledItem = styled(Paper)(({ theme }) => ({
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
  
  const topStoriesColumns = [
    {
      field: "title",
      headerName: "Title",
      width: "635",
      editable: false
    }
  ];

  const handleChange = (event) => {
    setSearchEngine(event.target.value);
  };
  
  const handleTopStoryClick = (record) => {
    window.open(record.row.url, "_blank", "noopener,noreferrer");
  }

  const handleLicenseClick = () => {
    window.open(licenseURL, "_blank", "noopener,noreferrer");
  }

  const handleRepositoryClick = () => {
    window.open(repositoryURL, "_blank", "noopener,noreferrer");
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ height: "10vh" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleMenu(true)}
          >
            <Menu />
          </IconButton>
          <Drawer
            open={menuToggle}
            onClose={toggleMenu(false)}
          >
            <Box 
              sx={{ width: 200 }}
              role="presentation"
              onClick={toggleMenu(false)}
              onKeyDown={toggleMenu(false)}
            >
              <ListItemText primary="Home" secondary="Dev Homepage" sx={{ marginLeft: 1, ".MuiListItemText-primary": { fontWeight: "bold" } }} />
              <Divider />
              <Box 
                sx={{
                  position: "fixed",
                  bottom: 0,
                  width: 200
                }}
              >
                <Divider />
                <ListItem key="repository" disablePadding>
                  <ListItemButton onClick={handleRepositoryClick}>
                    <ListItemIcon>
                      <GitHub />
                    </ListItemIcon>
                    <ListItemText primary="Repository" />
                  </ListItemButton>
                </ListItem>
                <ListItem key="license" disablePadding>
                  <ListItemButton onClick={handleLicenseClick}>
                    <ListItemIcon>
                      <KeyRounded />
                    </ListItemIcon>
                    <ListItemText primary="License" />
                  </ListItemButton>
                </ListItem>
              </Box>
            </Box>
          </Drawer>
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
                            ".MuiOutlinedInput-notchedOutline.Mui-focused": { border: 0 },
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
                        <IconButton type="submit" aria-label="search" size="small"><Search /></IconButton>
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
            <StyledItem>
              <Stack direction="row" alignItems="center" gap={1}>
                <Newspaper /><h3>HackerNews Top Stories</h3>
              </Stack>
              <Box sx={{ height: 350, width: "100%" }}>
                <StyledDataGrid
                  rows={topStories}
                  columns={topStoriesColumns}
                  onRowClick={handleTopStoryClick}
                  hideFooter
                  loading={topStoriesGridLoading}
                  disableColumnSelector
                  sx={{
                    "& .MuiDataGrid-row.Mui-selected": {
                      border: 0
                    }
                  }}
                />
              </Box>
            </StyledItem>
          </Grid>
          <Grid item xs={6}>
            {/* <StyledItem>
              <Box sx={{ height: 405, width: "100%" }}>
                <Stack direction="column" alignItems="center" gap={1}>
                  Coming Soon
                </Stack>
                </Box>
            </StyledItem> */}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
