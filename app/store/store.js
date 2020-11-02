const initialState = {

    title: null,

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.title
            }
        default:
            return state
    }
}

export {
    initialState,
    reducer,
}