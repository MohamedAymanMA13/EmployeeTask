import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function SellingForm(props) {
  const [state, setState] = useState({ carMake: '', carModel: '', fullName: '', phoneNumber: '' })
  const [validationError, setValidationError] = useState({})
  const [submitForm, setSubmitForm] = useState(false)

  useEffect(() => {}, [])
  const { t } = useTranslation() // ti18n

  const validation = data => {
    let carMakeError
    let carModelError
    let fullNameError
    let phoneNumberError
    let allFieldError
    if (
      data.carMake.length < 1 &&
      data.carModel.length < 1 &&
      data.fullName.length < 1 &&
      data.phoneNumber.length < 1
    ) {
      allFieldError = '* All fields are required to be filled'
    }
    if (data.carMake.length < 1) {
      carMakeError = 'Please select a car brand'
    }
    if (data.carModel.length < 1) {
      carModelError = 'Please select a car model'
    }
    if (data.fullName.length < 1) {
      fullNameError = 'Please write your full name'
    }
    if (data.phoneNumber.length < 1) {
      phoneNumberError = 'Please write your phone number'
    }
    if (allFieldError || carMakeError || carModelError || fullNameError || phoneNumberError) {
      setValidationError({ allFieldError, carMakeError, carModelError, fullNameError, phoneNumberError })
      return true
    }
    setValidationError({})

    return false
  }
  const handleChangeValue = e => {
    setState({ ...state, [e.target.name]: e.target.value })
    if (submitForm) {
      validation({ ...state, [e.target.name]: e.target.value })
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    const valid = validation(state)
    setSubmitForm(true)
    if (!valid) {
      console.log(state)
    }
  }
  return (
    <section className="selling-form py-md-5 py-3">
      <div className="container py-5 my-3 ">
        <form onSubmit={handleSubmit}>
          <h1 className="h3 text-dark fw-bold text-center mb-3">{t('Start today!')}</h1>
          <p className="fz14 text-muted col-lg-5 col-md-6 mx-auto text-center mb-4">
            {t('You are just one click away from selling your car.')}
          </p>
          <div className="row m-0 pt-3">
            <div className="col-md-6">
              <h1 className="h5 text-dark fw-bold  mb-3 text-md-start text-center">
                {t('Why you should sell your car with us?')}
              </h1>
              <p className="fz14 fw-bold text-muted mb-4 text-md-start text-center">
                {t('We support you from start to finish')}
              </p>
              <p className="fz13 text-muted col-md-10 text-md-start text-center ">
                {t(
                  'We have streamlined the process to sell your car online for quick payment to get your free cash offer.',
                )}
              </p>
              <p className="fz13 text-muted text-md-start text-center">{t('Ready to sell your car?')}</p>
            </div>
            <div className="col-md-6">
              <div className="mx-3 px-2">
                {validationError.allFieldError && (
                  <div className="invalid-value rounded text-start py-1 mb-3">
                    {validationError.allFieldError}
                  </div>
                )}
                <p className="fz14 fw-bold text-muted ">{t('Enter your car details')}</p>
                <div className="mb-3">
                  <label htmlFor="carMake" className="form-label fz13 text-muted">
                    {t('Car Make')}
                  </label>
                  <select
                    id="carMake"
                    name="carMake"
                    className={`form-select ${validationError.carMakeError ? 'is-invalid-input' : ''}`}
                    value={state.carMake}
                    onChange={e => handleChangeValue(e)}>
                    <option value="">{t('Select Brand')}</option>
                    <option value="Renault">{t('Renault')}</option>
                    <option value="Fiat">{t('Fiat')}</option>
                    <option value="Opel">{t('Opel')}</option>
                  </select>
                  {validationError.carMakeError && !validationError.allFieldError && (
                    <div className="invalid-value">{validationError.carMakeError}</div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="carModel" className="form-label fz13 text-muted">
                    {t('Car Make')}
                  </label>
                  <select
                    id="carModel"
                    name="carModel"
                    className={`form-select ${validationError.carModelError ? 'is-invalid-input' : ''}`}
                    value={state.carModel}
                    onChange={e => handleChangeValue(e)}>
                    <option value="">{t('Select Model')}</option>
                    <option value="Captur">{t('Captur')}</option>
                    <option value="hatchback">{t('hatchback')}</option>
                  </select>
                  {validationError.carModelError && !validationError.allFieldError && (
                    <div className="invalid-value">{validationError.carModelError}</div>
                  )}
                </div>
                <p className="fz14 fw-bold text-muted ">{t('Enter your car details')}</p>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label fz13 text-muted">
                    {t('Your Full Name')}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${validationError.fullNameError ? 'is-invalid-input' : ''}`}
                    id="fullName"
                    name="fullName"
                    value={state.fullName}
                    onChange={e => handleChangeValue(e)}
                  />
                  {validationError.fullNameError && !validationError.allFieldError && (
                    <div className="invalid-value">{validationError.fullNameError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label fz13 text-muted">
                    {t('Your Phone Number')}
                  </label>
                  <input
                    type="number"
                    className={`form-control ${validationError.phoneNumberError ? 'is-invalid-input' : ''}`}
                    id="phoneNumber"
                    name="phoneNumber"
                    value={state.phoneNumber}
                    onChange={e => handleChangeValue(e)}
                  />
                  {validationError.phoneNumberError && !validationError.allFieldError && (
                    <div className="invalid-value">{validationError.phoneNumberError}</div>
                  )}
                </div>
                <div className="pt-4 btn-hover-behavior d-flex justify-content-md-start justify-content-center">
                  <button
                    type="submit"
                    className="btn px-3 bgc-primary bgc-primary-hover text-white fz13 m-0 shadow-button ">
                    {t('Send Your Inquiry')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default SellingForm
