import { GET_ALL_EMPLOYEE, GET_EMPLOYEE_BY_ID } from 'redux/store/actionTypes'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE:
      return {
        ...state,
        data: action.payload,
      }
    case GET_EMPLOYEE_BY_ID:
      return {
        ...state,
        edit: action.payload,
      }
    default:
      return { ...state }
  }
}

export default reducer
