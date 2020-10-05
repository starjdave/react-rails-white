export default function brandReducer(state=[], action){
    switch (action.type) {
        case "SET_LISTINGS":
            return state.listings ? [...state.listings, ...action.listings] : [...action.listings]
        default:
            return state;
    }
}