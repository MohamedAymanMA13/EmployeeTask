import { combineReducers } from 'redux'
import Employee from 'redux/store/Employee/reducer'
import Global from 'redux/store/Global/reducer'

const rootReducer = combineReducers({
  Employee,
  Global,
})

export default rootReducer
