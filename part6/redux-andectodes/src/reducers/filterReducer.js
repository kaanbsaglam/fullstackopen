
const filterReducer = (state = '', action) => {
  console.log("action: ", action)
  switch(action.type){
    case 'CHANGE_FILTER':
      return action.payload
    default:
      return state
  }
} 


export const changeFilter = (newFilter) => {
  return {
    type: 'CHANGE_FILTER',
    payload: newFilter
  }
} 




export default filterReducer