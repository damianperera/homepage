import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import * as React from "react";
import { Google, Code, PrivacyTip, Newspaper, Search, Menu, KeyRounded, GitHub, Twitter, Error } from "@mui/icons-material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { Box, TextField, FormControl, Stack , AppBar, Toolbar, IconButton, CssBaseline, MenuItem, InputAdornment, Select, Paper, Grid, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { TwitterTimelineEmbed } from 'react-twitter-embed';

function MainMenuDrawer({ isOpen, onChange }) {
  const licenseURL = "https://github.com/damianperera/homepage/blob/main/LICENSE.md";
  const repositoryURL = "https://github.com/damianperera/homepage";

  const handleLicenseClick = () => {
    window.open(licenseURL, "_blank", "noopener,noreferrer");
  }

  const handleRepositoryClick = () => {
    window.open(repositoryURL, "_blank", "noopener,noreferrer");
  }
  return (
    <Drawer
      open={isOpen}
      onClose={onChange(false)}
    >
      <Box 
        sx={{ width: 200 }}
        role="presentation"
        onClick={onChange(false)}
        onKeyDown={onChange(false)}
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
  );
}

function SearchEngineBar() {
  const googleSearchURL = "https://www.google.com/search";
  const stackOverflowSearchURL = "https://stackoverflow.com/search";
  const duckDuckGoSearchURL = "https://duckduckgo.com";

  const [searchEngine, setSearchEngine] = React.useState(googleSearchURL);

  const handleSearchEngineChange = (event) => {
    setSearchEngine(event.target.value);
  };

  return (
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
                  onChange={handleSearchEngineChange}
                  sx={{
                    boxShadow: "none",
                    ".MuiOutlinedInput-notchedOutline": { border: 0 },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& > fieldset": {
                        border: 0
                      }
                    },
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
  );
}

function Header() {
  const [menuToggle, setMenuToggle] = React.useState(false);

  const toggleMenu = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setMenuToggle(open);
  };

  return (
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
        <MainMenuDrawer 
          isOpen={menuToggle}
          onChange={toggleMenu}
        />
        <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <SearchEngineBar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Weather() {
  return (
    <a 
      className="weatherwidget-io" 
      href="https://forecast7.com/en/48d1411d58/munich/"
      data-label_1="MÜNCHEN"
      data-label_2="BAYERN DE"
      data-theme="dark"
      data-basecolor="#121212"
      data-icons="Climacons Animated"
      style={{ 
        textDecoration: "none",
        color: "white",
        pointerEvents: "none"
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="center" gap={1} sx={{ paddingTop: "2%" }}>
        <CircularProgress size={25} /> Loading Weather
      </Stack>
    </a>
  );
}

function App() {
  const twitterListId = "1579994115697041409";

  const [topStories, setTopStories] = React.useState([]);
  const [topStoriesGridLoading, setTopStoriesGridLoading] = React.useState(true);
  const [twitterListLoading, setTwitterListLoading] = React.useState(true);
  const [twitterListLoadingFailed, setTwitterListLoadingFailed] = React.useState(false);

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
      width: "525",
      editable: false
    }
  ];
  
  const handleTopStoryClick = (record) => {
    window.open(record.row.url, "_blank", "noopener,noreferrer");
  }

  const handleOnTwitterListLoadComplete = (e) => {
    if (e === undefined) {
      setTwitterListLoadingFailed(true);
    }
    setTwitterListLoading(false);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12}>
            <Box sx={{ height: 100 }}>
              <Weather />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <StyledItem>
              <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
                <Twitter /><h3>Development & Tech Tweets</h3>
              </Stack>
              <Box sx={{ height: 650, width: "100%" }}>
                { twitterListLoading 
                    && <CircularProgress sx={{ marginTop: "30%" }} />
                }
                { twitterListLoadingFailed 
                    && 
                      <Stack direction="row" alignItems="center" justifyContent="center" gap={1} sx={{ paddingTop: "30%" }}>
                        <Error /> Something went wrong, are you logged into Twitter?
                      </Stack>
                }
                <TwitterTimelineEmbed 
                  sourceType="list" 
                  id={twitterListId}
                  theme="dark"
                  autoHeight
                  noHeader
                  noFooter
                  noBorders
                  tweetLimit={20}
                  onLoad={handleOnTwitterListLoadComplete}
                />
              </Box>
            </StyledItem>
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export function CustomFooterComponent() {
  return (
    <Box sx={{ display: 'flex' }}>
      Status  asd
    </Box>
  );
}

export default App;
