import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import * as React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Google, Code, PrivacyTip } from "@mui/icons-material";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { Box, TextField, FormControl, Stack , AppBar, Toolbar, IconButton, CssBaseline, MenuItem, InputAdornment, Select, Paper, Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

function App() {
  const googleSearchURL = "https://www.google.com/search";
  const stackOverflowSearchURL = "https://stackoverflow.com/search";
  const duckDuckGoSearchURL = "https://duckduckgo.com";

  const [searchEngine, setSearchEngine] = React.useState(googleSearchURL);

  const handleChange = (event) => {
    setSearchEngine(event.target.value);
  };

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
                        <InputAdornment>
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
          <Grid container spacing={2} columns={2}>
            <Grid item xs={1}>
              <Item>
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                  />
                </Box>
              </Item>
            </Grid>
            <Grid item xs={1}>
              <Item>Coming Soon</Item>
            </Grid>
          </Grid>
        </Box>
    </ThemeProvider>
  );
}

export default App;
