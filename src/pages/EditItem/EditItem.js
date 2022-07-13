import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { GetEmployeeById, EditEmployee, alertSuccessMes } from 'redux/store/actions'
import { useTranslation } from 'react-i18next'
import { useHistory, useParams } from 'react-router-dom'
import { clearConfigCache } from 'prettier'
// ii18n
function EditItem(props) {
  const { t } = useTranslation() // ti18n
  const [item, setItem] = useState({ firstName: '', lastName: '', email: '', address: '', dateOfBirth: '' })
  const [validationError, setValidationError] = useState({})
  const history = useHistory()
  const { id } = useParams()
  useEffect(() => {
    props.GetEmployeeById(id)
  }, [])
  useEffect(() => {
    if (props.edit) {
      setItem(props.edit)
    }
  }, [props.edit])

  console.log(props.edit)
  const validation = data => {
    let firstNameError
    let lastNameError
    let emailError
    let addressError
    let dateOfBirthError
    let allFieldError
    if (
      data.firstName.length < 1 &&
      data.lastName.length < 1 &&
      data.email.length < 1 &&
      data.address.length < 1 &&
      data.dateOfBirth.length < 1
    ) {
      allFieldError = '* All fields are required to be filled'
    }
    if (data.firstName.length < 1) {
      firstNameError = 'Please write your First Name'
    }
    if (data.lastName.length < 1) {
      lastNameError = 'Please write your Last Name'
    }
    if (data.email.length < 1) {
      emailError = 'Please write your Email'
    }
    if (data.address.length < 1) {
      addressError = 'Please write your Address'
    }
    if (data.dateOfBirth.length < 1) {
      dateOfBirthError = 'Please write your Date Of Birth'
    }
    if (allFieldError || firstNameError || lastNameError || emailError || addressError || dateOfBirthError) {
      setValidationError({
        allFieldError,
        firstNameError,
        lastNameError,
        emailError,
        addressError,
        dateOfBirthError,
      })

      return true
    }
    setValidationError({})

    return false
  }

  const handleOnChange = event => {
    const { name, value } = event.target
    setItem({ ...item, [name]: value })
  }
  const submit = e => {
    e.preventDefault()
    const valid = validation(item)

    if (!valid) {
      props.EditEmployee(item).then(() => {
        history.push('/')
        props.alertSuccessMes('Employee Info Changed Successfully')
      })
    }
  }

  return (
    <div className=" container py-3">
      <h1>Edit Employe</h1>
      <form className=" d-flex">
        <div className="row">
          {/* {JSON.stringify(validationError)}
          {validationError.allFieldError && (
            <div className="invalid-value rounded text-start py-1 mb-3">{validationError.allFieldError}</div>
          )} */}
          <div className="col-4 py-1">
            <label htmlFor="firstName">First name</label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              value={item.firstName}
              onChange={handleOnChange}
              className={`form-control ${validationError.firstNameError ? 'is-invalid-input' : ''}`}
              placeholder="First name"
            />
            {validationError.firstNameError && (
              <div className="invalid-value">{validationError.firstNameError}</div>
            )}
          </div>
          <div className="col-4 py-1">
            <label htmlFor="lastName">Last name</label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              value={item.lastName}
              onChange={handleOnChange}
              className={`form-control ${validationError.lastNameError ? 'is-invalid-input' : ''}`}
              placeholder="Last name"
            />
            {validationError.lastNameError && (
              <div className="invalid-value">{validationError.lastNameError}</div>
            )}
          </div>
          <div className="col-4 py-1">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              value={item.email}
              onChange={handleOnChange}
              className={`form-control ${validationError.emailError ? 'is-invalid-input' : ''}`}
              placeholder="Email"
              required
            />
            {validationError.emailError && <div className=" invalid-value">{validationError.emailError}</div>}
          </div>
          <div className="col-4 py-1">
            <label htmlFor="address">Address</label>
            <input
              name="address"
              id="address"
              type="text"
              value={item.address}
              onChange={handleOnChange}
              className={`form-control ${validationError.addressError ? 'is-invalid-input' : ''}`}
              placeholder="Address"
            />
            {validationError.addressError && (
              <div className="invalid-value">{validationError.addressError}</div>
            )}
          </div>
          <div className="col-4 py-1">
            <label htmlFor="dateOfBirth">Date Of Birth</label>
            <input
              name="dateOfBirth"
              id="dateOfBirth"
              type="date"
              value={item.dateOfBirth?.split('T')[0]}
              onChange={handleOnChange}
              className={`form-control ${validationError.dateOfBirthError ? 'is-invalid-input' : ''}`}
              placeholder="Date Of Birth"
            />
            {validationError.dateOfBirthError && (
              <div className="invalid-value">{validationError.dateOfBirthError}</div>
            )}
          </div>
          <div className="py-3 my-1">
            <button type="submit" onClick={submit} className="btn btn-primary">
              Edit Employe
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    edit: state.Employee.edit,
  }
}
const mapDispatchToProps = {
  GetEmployeeById,
  EditEmployee,
  alertSuccessMes,
}
export default connect(mapStateToProps, mapDispatchToProps)(EditItem)
