import React, { useEffect } from 'react'
import Test from 'pages/Test/Test'
import createItem from 'pages/createItem/createItem'
import Edit from 'pages/EditItem/EditItem'

import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './i18n'
import { Router, Switch, Route } from 'react-router-dom'
import history from 'redux/_helpers/history'
import { connect } from 'react-redux'
import { resetMsg } from 'redux/store/actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

require('dotenv').config()

function App(props) {
  useEffect(() => {
    history.listen(() => {
      window.scrollTo(0, 0)
      props.resetMsg()
    })
  }, [])
  return (
    <div className="App" dir={props.lang === 'en' ? 'rtl' : 'ltr'}>
      <Router history={history}>
        <Route exact path="/" component={Test} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/create" component={createItem} />
      </Router>
      {props.alertSuccessMessage ? (
        <div>
          <ToastContainer />
        </div>
      ) : (
        ''
      )}
      {props.alertErrorMessage ? (
        <div>
          <ToastContainer />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    lang: state.Global.lang,
    alertSuccessMessage: state.Global ? state.Global.alertSuccessMessage : false,
    alertErrorMessage: state.Global ? state.Global.alertErrorMessage : null,
  }
}

const mapDispatchToProps = { resetMsg }
export default connect(mapStateToProps, mapDispatchToProps)(App)
