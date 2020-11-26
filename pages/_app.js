import React from 'react'
import '../app/styles/globals.scss'

// GLOBAL STATE
import { StoreContext } from '../app/store/context'
import { reducer, initialState } from '../app/store/store'

function App({ Component, pageProps }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    return (
        <StoreContext.Provider value={{ dispatch, state }}>
            <Component {...pageProps} />
        </StoreContext.Provider>
    )
}

export default App