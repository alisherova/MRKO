import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {ThemeProvider} from "./contexts/themeContext";
import {BrowserRouter as Router} from 'react-router-dom';
import "./index.css";
import MainContext from "./contexts/MainContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <MainContext>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </MainContext>
        </Router>
    </React.StrictMode>
);
