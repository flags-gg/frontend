import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {AuthProvider} from 'react-oidc-context';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {oidcConfig} from "./app.config";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StrictMode>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <AuthProvider {...oidcConfig}>
                <DevSupport ComponentPreviews={ComponentPreviews}
                            useInitialHook={useInitial}
                >
                    <App/>
                </DevSupport>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);

reportWebVitals();
