import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  state = {
    categoryinput: '',
    name: 'hai',
    labelWidth: 0,
  };

  componentDidMount() {
    if(this.props.category_id){
      this.setState({
        labelWidth: 100,
        categoryinput: this.props.category_id
      });
    } else {
      this.setState({
        labelWidth: 100,
        categoryinput: ''
      });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.getSelectValue(event.target.value);
  };

  
  render() {
    const { classes } = this.props;

    return (
    
        <FormControl className={classes.formControl}>
          <Select
            className='productselect'
            value={this.state.categoryinput}
            onChange={this.handleChange}
            name="categoryinput"
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="" disabled>Product category</MenuItem>
            { this.props.categories ?
             this.props.categories.map((category) => ( <MenuItem value={category.id}>{category.name}</MenuItem> )) 
             : ''
            }
          </Select>
        </FormControl>
     
    );
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);