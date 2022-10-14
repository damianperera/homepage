import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, CssBaseline, Grid } from "@mui/material";
import { Header, Weather, TwitterList, HackerNewsTopStories } from "./components";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

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
            <TwitterList />
          </Grid>
          <Grid item xs={4}>
            <HackerNewsTopStories />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
