import React from 'react'
import ReactDOM from 'react-dom/client'
import 'normalize.css'
import './styles/index.css'
import App from './components/App/App'
import { Provider } from 'react-redux'
import { rootReducer } from './store'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore({
  reducer: { rootReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)
