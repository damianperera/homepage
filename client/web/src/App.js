import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import * as React from 'react';
import { Button, Box, TextField, FormControl, Stack } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            width: 500,
            height: 55,
            backgroundColor: 'white',
            padding: 2,
            display: 'flex',
            borderRadius: '5px'
          }}
        >
          <form action="https://www.google.com/search">
            <FormControl focused="true">
              <Stack direction="row" spacing={2}>
                <TextField autoFocus name="q" required id="search" label="Search Google or type a URL" variant="outlined" sx={{ width: 385 }} />
                <Button variant="contained" type="submit" sx={{ width: 100 }}>Search</Button>
              </Stack>
            </FormControl>
          </form>
        </Box>
      </header>
    </div>
  );
}

export default App;
