import React from 'react';
import SearchBar from 'material-ui-search-bar'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    spacer: {
      flex: '1 1 100%',
    },
    actions: {
      color: theme.palette.text.secondary,
    },
    title: {
      flex: '0 0 auto',
    },
  });
  

class EnhancedTableToolbar extends React.Component {

    state = {
        search: ""
    }

    render() {
  
        const { classes } = this.props;

  return (
        <Toolbar
        className={classes.root}
        >
        <div className={classes.title}>
            <Typography variant="h6" id="tableTitle">
                Brastlewark
            </Typography>
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
            <SearchBar
                value={this.state.search}
                onChange={(newValue) => this.setState({ search: newValue })}
                onRequestSearch={() => this.props.onSearch(this.state.search)}
                onCancelSearch={() => this.props.onSearch(null)}
            />
        </div>
        </Toolbar>
    );
    };

}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

export default EnhancedTableToolbar;
