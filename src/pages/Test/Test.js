import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { GetAllEmployee, DeleteEmployee, GetEmployeeById } from 'redux/store/actions'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// ii18n
function Test(props) {
  const [items, setItems] = useState([
    {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      dateOfBirth: '',
    },
  ])
  useEffect(() => {
    props.GetAllEmployee()
  }, [])

  const { t } = useTranslation() // ti18n
  const removeSite = id => {
    props.DeleteEmployee(id)
  }
  return (
    <div className=" container">
      <div className="py-3 d-flex justify-content-between">
        <h3 className="">All Employees</h3>
        <Link to="/create" className="btn btn-success text-light">
          Create Employee
        </Link>
      </div>
      <div className="">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Date Of Birth</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {props.data?.map((item, i) => (
              <tr key={`${i + 1}data`}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.dateOfBirth}</td>
                <td>
                  <div className=" ">
                    <Link
                      className="Remove  btn btn-primary  me-2 text-light  "
                      type="button"
                      to={`/edit/${item.id}`}>
                      Edit
                    </Link>

                    <button
                      className="Remove  btn btn-danger "
                      type="button"
                      onClick={e => removeSite(item.id)}>
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    data: state.Employee.data,
  }
}
const mapDispatchToProps = {
  GetAllEmployee,
  DeleteEmployee,
  GetEmployeeById,
}
export default connect(mapStateToProps, mapDispatchToProps)(Test)
