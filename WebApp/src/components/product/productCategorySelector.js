import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';

const styles = theme => ({
    button: {
        margin: 40,
        textTransform: 'capitalize',
    },
});

class ProductCategorySelector extends Component {
    state = {
        autoCompleteData: [],
    };

    constructor(props) {
        super(props);
        this.folderSelection = React.createRef();
    }

    render() {
        const {classes} = this.props;

        return(
            <div> say somthing
            </div>
        );
    }

}


ProductCategorySelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCategorySelector);