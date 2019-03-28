import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

import store from './store'
import theme from './ui/theme'

import RootProviders from './RootProviders'
import App from './App'

import './index.scss'

const rootDecorator = RootProviders({
  store,
  theme
})

const root = document.getElementById('root')

const render = Component => {
  ReactDOM.render(rootDecorator(Component), root)
}

render(App)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
