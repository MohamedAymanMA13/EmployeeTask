import axios from 'axios'
import { GET_ALL_EMPLOYEE, GET_EMPLOYEE_BY_ID, TEST2 } from 'redux/store/actionTypes'

export const GetAllEmployee = () => {
  return dispatch => {
    axios
      .get(`http://gammats.com:9001/Employees`, {})
      .then(res => {
        dispatch({
          type: GET_ALL_EMPLOYEE,
          payload: res.data,
        })
      })
      .catch(error => {})
  }
}
export const DeleteEmployee = id => {
  return dispatch => {
    axios
      .delete(`http://gammats.com:9001/Employees/${+id}`, {})
      .then(() => {
        dispatch(GetAllEmployee())
      })
      .catch(error => {})
  }
}
export const AddEmployee = item => {
  return dispatch => {
    return new Promise(resolve => {
      axios
        .post(`http://gammats.com:9001/Employees`, item)
        .then(response => {
          resolve(response)
        })
        .catch(error => {})
    })
  }
}
export const GetEmployeeById = id => {
  return dispatch => {
    axios
      .get(`http://gammats.com:9001/Employees/${+id}`, {})
      .then(editById => {
        dispatch({
          type: GET_EMPLOYEE_BY_ID,
          payload: editById.data,
        })
      })
      .catch(error => {})
  }
}
export const EditEmployee = item => {
  return dispatch => {
    return new Promise(resolve => {
      axios
        .put(`http://gammats.com:9001/Employees/${+item.id}`, item)
        .then(respon => {
          resolve(respon)
        })
        .catch(error => {})
    })
  }
}
export const testAction2 = () => {
  return dispatch => {
    dispatch({ type: TEST2, payload: ['test1', 'test2'] })
  }
}
