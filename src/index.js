import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"

// if (process.env.NODE_ENV === 'development') {
//   const { worker } = require('./mocks/browser')
//   console.log(worker)
//   worker.start()
// }

const theme = createMuiTheme()

const component = (
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
)

ReactDOM.render(component, document.getElementById("root"))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// import './index.css';
// import reportWebVitals from "./reportWebVitals"
// reportWebVitals();
