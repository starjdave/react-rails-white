export default function brandReducer(state={}, action){
  switch (action.type) {
    case "SET_BRAND":
      const brandWithInfo = {...action.brand.brand, ...action.brand}
      delete brandWithInfo['brand']
      return {...state, ...brandWithInfo, contact: action.brand.contact}
    case "SET_HOME":
      return {...state, home: {...action.brand, options: action.brand.options}}
    default:
      return state;
  }
}