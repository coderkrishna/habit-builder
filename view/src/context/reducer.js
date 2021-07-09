import {
    SET_HABIT,
    SET_LOADING,
    HABIT_TO_UPDATE,
    SET_SINGLE_HABIT
  } from "./action.types";
  
  const habitReducer = (state,action) => {
    switch(action.type) {
      case SET_HABIT:
        return action.payload === null ? {...state,habits:[]} 
                :{...state,habits:action.payload}
      case SET_LOADING:
        return {...state,isLoading: action.payload}
      case HABIT_TO_UPDATE:
        return {
          ...state,
          habitToUpdate : action.payload,
          habitToUpdateKey : action.key
        }
      case SET_SINGLE_HABIT:
        return {
          ...state,
          habit: action.payload
        }
      default:
        return state;
    }
  }
  
  
  export default habitReducer;