import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import './App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="on"
        >
          <form action="https://www.google.com/search">
            <FormControl focused="true">
              <TextField autoFocus name="q" required id="outlined-basic" label="Search Google or type a URL" variant="filled" />
              <Button variant="contained" type="submit">Search</Button>
            </FormControl>
          </form>
        </Box>
      </header>
    </div>
  );
}

export default App;
