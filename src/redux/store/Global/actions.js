import history from 'redux/_helpers/history'
import { ToastContainer, toast } from 'react-toastify'
import {
  IS_LOGIN,
  LOADING,
  RESET_MSG,
  ALERT_SUCCESS_MESSAGE,
  ALERT_ERROR_MESSAGE,
  LANGUAGE,
} from '../actionTypes'

export const SetLang = value => {
  return dispatch => {
    dispatch({ type: LANGUAGE, payload: value })
    localStorage.setItem('Lang', value)
  }
}

export const loading = obj => {
  return dispatch => {
    dispatch({ type: LOADING, payload: obj })
  }
}
export function alertSuccessMes(Msg) {
  toast.success(Msg)
  return dispatch => {
    dispatch({ type: ALERT_SUCCESS_MESSAGE, payload: Msg })
    setTimeout(() => {
      dispatch({ type: ALERT_SUCCESS_MESSAGE, payload: false })
    }, 5000)
  }
}
// return error message as string
export function alertErrorMes(Msg) {
  toast.error(Msg)
  return dispatch => {
    dispatch({ type: ALERT_ERROR_MESSAGE, payload: Msg })
    setTimeout(() => {
      dispatch({ type: ALERT_ERROR_MESSAGE, payload: false })
    }, 5000)
  }
}

export function resetMsg() {
  return dispatch => {
    dispatch({ type: RESET_MSG })
  }
}

export function handleCatchError(error, fun) {
  return dispatch => {
    // console.log(navigator);
    if (!error.response) {
      // in case internal server error 500
      if (navigator.onLine) {
        dispatch(alertErrorMes('something went wrong with your request.please try again later'))
      } else {
        dispatch(alertErrorMes('please check your connection'))
      }
    } else if (error.response.status === 401) {
      // in case unauthorized  401
      localStorage.removeItem('userDimensions')
      dispatch({ type: IS_LOGIN, payload: false })
      history.push('/signin')
    } else if (error.response.status === 404) {
      dispatch(alertErrorMes('Item not found'))
    } else if (error.response.data && error.response.data.ValidationErrors?.length) {
      if (fun) {
        dispatch(fun(error.response.data.ValidationErrors))
      }
    } else if (navigator.onLine) {
      dispatch(alertErrorMes('something went wrong with your request.please try again later'))
    } else {
      dispatch(alertErrorMes('please check your connection'))
    }
  }
}
