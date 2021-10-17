import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import Dashboard from './containers'
import ColorModeContext from './components/theme/ColorModeContext';

function App() {

  const [mode, setMode] = React.useState('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <div className="App">
          <Dashboard />
      </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
