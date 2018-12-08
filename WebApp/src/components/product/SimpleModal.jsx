import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import ProductForm from "./productForm.jsx";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  // const top = 50 + rand();
  // const left = 50 + rand();

  const top = 50;
  const left = 50;  

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: '500px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});
let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px',color: '#626262'};
class SimpleModal extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <span className="productedit" onClick={this.handleOpen}><i class="fas fa-pencil-alt"></i></span>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
         <div style={getModalStyle()} className={classes.paper}>
           <span style={closeImg} onClick={this.handleClose}> <i class="fa fa-times" aria-hidden="true"></i></span>
              <ProductForm {...this.props} handleClose={ this.handleClose}/>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;