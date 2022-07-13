import {
  LOADING,
  RESET_MSG,
  ALERT_ERROR_MESSAGE,
  ALERT_SUCCESS_MESSAGE,
  LANGUAGE,
} from 'redux/store/actionTypes'

export const initialState = {
  alertErrorMessage: false,
  alertSuccessMessage: false,
  loading: false,
  // loadingCounter: 0,
  lang: localStorage.getItem('Lang') ? localStorage.getItem('Lang') : 'ar',
}

const account = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: { ...state.loading, ...action.payload },
      }
    case ALERT_SUCCESS_MESSAGE:
      return {
        ...state,
        alertSuccessMessage: action.payload,
      }
    case ALERT_ERROR_MESSAGE:
      return {
        ...state,
        alertErrorMessage: action.payload,
      }
    case RESET_MSG:
      return {
        ...state,
        alertSuccessMessage: false,
        alertErrorMessage: false,
      }

    case LANGUAGE:
      return {
        ...state,
        lang: action.payload,
      }

    default:
      return { ...state }
  }
}

export default account
