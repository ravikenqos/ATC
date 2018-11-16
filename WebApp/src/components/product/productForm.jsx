import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';


const adaptFileEventToValue = delegate => e => delegate(e.target.files[0]);

const renderField = (rField) =>{ 

    const { input, label, type, meta: { touched, error, warning } } = rField;
    
    return (
        <div>
      
        <div>
          <input {...input} placeholder={label} type={type} className="form-control" />
          {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
        <input
            onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...props.input}
      {...props}
    />        
      </div>
   
  )
  }



let productForm = props => {
    const { handleSubmit } = props;

    return (
      <div className="form-container">
       
        <form onSubmit={handleSubmit}>
           <div className="emailField inputField">
            <Field name="productname" component={renderField} type="text" placeholder="Product Name" />
          </div>
          <div className="passwordField inputField">
            <Field name="describeproduct" component={renderField} type="text" placeholder="Describe your product"  />
          </div>
          <div className="confirmpasswordField inputField">
            <Field name="price" component={renderField} type="text" label="price" />
          </div>
          <div className="confirmpasswordField inputField">
            <Field name="price" component={renderField} type="text" label="price" />
          </div>
          <div>
              <label>Attachment</label>
              <Field name="attachment" component={renderField} type="file"/>
            </div>          
          <div className="submitField inputField">
          <button type="submit" className="btn" className="signupubmit">Create Account</button>
          </div>
        </form>
      </div>
    )
}


const validate = props => {
  const errors = {};
  const fields = ['email', 'password', 'confirmpassword'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });

  if(props.lastname && props.lastname.length > 20) {
    errors.lastname = "maximum of 20 characters";
  }

  if(props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "please provide valid email";
  }

  if(props.password && props.password.length < 6) {
    errors.password = "minimum 6 characters";
  }

  if(props.password !== props.confirmpassword) {
    errors.confirmpassword = "passwords doesn't match";
  }

  return errors;
};


productForm = reduxForm({
    form: 'productForm',
    validate 
})(productForm);

export default productForm;