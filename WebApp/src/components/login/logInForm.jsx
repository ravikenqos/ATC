import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';


const renderField = (rField) =>{ 
  const { input, label, type, meta: { touched, error, warning } } = rField;
  
  return (
  <div>
    {/* <label className={className}>{label}</label> */}
    <div>
    <TextField
    hintText={label}
    type = {type}
    placeholder={label}
    errorText={touched && error}
    {...input}
  />
    <br/>
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)
}

let LogInForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <div className="emailField inputField">
        <Field type="text"  name="email" component={renderField}  label="email" floatingLabelText="email" />
      </div>
      <div className="passwordField inputField">
        <Field type="password" name="password" className="form-control inputfield" component={renderField} label="password" />
      </div>

      <div className="submitField inputField">
        <button type="submit" className="loginsubmit">Sign in</button>
      </div>
    </form>
  )
}


const validate = values => {
  const errors = {}

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)  && values.email) {
    errors.email = 'Invalid email address'
  }
  
  return errors
}

LogInForm = reduxForm({
  form: 'login',
  validate,
})(LogInForm);


export default LogInForm;