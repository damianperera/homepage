import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Google, Code } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, TextField, FormControl, Stack , AppBar, Toolbar, IconButton, CssBaseline, MenuItem, InputAdornment } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  const [searchEngine, setSearchEngine] = React.useState('https://www.google.com/search');

  const handleChange = (event: SelectChangeEvent) => {
    setSearchEngine(event.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={{ height: 100 }}>
            <Box 
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ flexGrow: 1 }}
            >
              <form action={searchEngine}>
                <FormControl variant="standard">
                  <TextField autoFocus name="q" required id="search" placeholder="Enter search text" variant="outlined" sx={{ width: 700 }} 
                    InputProps={{
                      startAdornment: 
                        <InputAdornment>
                          <Select 
                            labelId="search-engine-label" 
                            id="search-engine" 
                            value={searchEngine} 
                            onChange={handleChange} 
                            sx={{
                              boxShadow: 'none',
                              '.MuiOutlinedInput-notchedOutline': { border: 0 } ,
                              marginLeft: -2,
                              marginRight: 2,
                              width: 190
                            }}
                          >
                            <MenuItem value={"https://www.google.com/search"}>
                              <Stack direction="row" alignItems="center" gap={1}>
                                <Google /> Google
                              </Stack>
                            </MenuItem>
                            <MenuItem value={"https://stackoverflow.com/search"}>
                              <Stack direction="row" alignItems="center" gap={1}>
                                <Code /> StackOverflow
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
    </ThemeProvider>
  );
}

export default App;
