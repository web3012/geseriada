const initialState = {

    title: null,

    soundID: null

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TITLE':
            return {
                ...state,
                title: action.title
            }
        case 'SET_SOUND_ID':
            return {
                ...state,
                soundID: action.id
            }
        default:
            return state
    }
}

export {
    initialState,
    reducer,
}