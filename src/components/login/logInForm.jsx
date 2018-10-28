import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';


const renderField = (rField) =>{ 
  console.log(rField);
  console.log(rField.type);
  const { input, label, type, meta: { touched, error, warning } } = rField;
  
  return (
  <div>
    {/* <label className={className}>{label}</label> */}
    <div>
    <TextField
    hintText={label}
    label={label}
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
      <div >
        <Field type="text"  name="email" component={renderField}  label="Email" floatingLabelText="Email" />
      </div>
      <div >
        <Field type="password" name="password" className="form-control inputfield" placeholder="Password" component={renderField} label="Password" />
      </div>

      <div >
        <button type="submit" className="loginsubmit">Login</button>
      </div>
    </form>
  )
}


const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 6) {
      errors.password = 'Minimum be 6 characters or more'
    }
  return errors
}

LogInForm = reduxForm({
  form: 'login',
  validate,
})(LogInForm);


export default LogInForm;