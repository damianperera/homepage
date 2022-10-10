import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import * as React from 'react';
import { Google, Code } from '@mui/icons-material';
import { Button, Box, TextField, FormControl, Stack } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            width: 500,
            height: 130,
            backgroundColor: 'white',
            padding: 2,
            display: 'flex',
            borderRadius: 1.5
          }}
        >
          <Stack direction="column" spacing={2}>
            <form action="https://www.google.com/search">
              <FormControl fullWidth>
                <Stack direction="row" spacing={2}>
                  <TextField autoFocus name="q" required id="search" label="Search Google" variant="outlined" sx={{ width: 385 }} />
                  <Button variant="contained" type="submit" sx={{ width: 100 }} startIcon={<Google />}>Search</Button>
                </Stack>
              </FormControl>
            </form>
            <form action="https://stackoverflow.com/search">
              <FormControl fullWidth>
                <Stack direction="row" spacing={2}>
                  <TextField name="q" required id="search" label="Search StackOverflow" variant="outlined" sx={{ width: 385 }} />
                  <Button variant="contained" type="submit" sx={{ width: 100 }} startIcon={<Code />}>Search</Button>
                </Stack>
              </FormControl>
            </form>
          </Stack>
        </Box>
      </header>
    </div>
  );
}

export default App;
