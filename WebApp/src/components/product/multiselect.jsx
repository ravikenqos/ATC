
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, that) {
  return {
    fontWeight:
      that.state.name.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class MultipleSelect extends React.Component {
  state = {
    name: [],
  };
 
  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  renderList = () =>{
    if(this.props.categories){
      console.log(this.props.categories)
      const list = (
       
      this.props.categories.map(category => ( 
        <MenuItem key={category.id} value={category.name}>
        <Checkbox checked={this.checkedCategory(category.id)} />
        <ListItemText primary={category.name} />
        </MenuItem>  
      ))
      
      )
      return(
        <Fragment>
          {list}
      </Fragment>
      )
    }
  }
  checkedCategory = (id) => {
    if(this.props.categories){
      this.props.categories.forEach((item) => {
        if(item.id === id){
          return true;
        }
      })

    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
       
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-checkbox">Select Category</InputLabel>
          <Select
            multiple
            value={this.state.name}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {/* {names.map(name => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))} */}
              {/* {
             
              this.props.categories.forEach(category =>( 
                <MenuItem key={category.id} value={category.name}>
                <Checkbox checked={this.state.name.indexOf(category.id) > -1} />
                <ListItemText primary={category.name} />
                </MenuItem>               
             ) )
            }   */}
            {this.renderList()}
          </Select>
        </FormControl>
        
        </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelect);