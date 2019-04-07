import React from 'react'
import {Provider as ReduxProvider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'

const withRoot = ({store, theme}) => Component => (
  <ReduxProvider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <Component />
      </ThemeProvider>
    </Router>
  </ReduxProvider>
)

export default withRoot
