import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/authentication';

class Logout extends Component {
  componentWillMount() {
   
        
        this.props.userLogout();
        this.props.history.push('/');
  }

  render() {
    return <div className="content">We hope to see you again soon...</div>
  }
}



export default connect(null, actions)(Logout);