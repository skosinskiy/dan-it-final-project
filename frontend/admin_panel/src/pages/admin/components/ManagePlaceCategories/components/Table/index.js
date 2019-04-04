import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {placesCategoriesOperations} from 'store/placeCategory'
import {connect} from 'react-redux'
import Preloader from 'components/Preloader';
import SubmitButton from './components/Buttons/Submit'
import ResetButton from './components/Buttons/Reset'
import TextField from './components/TextField'
import DeleteButton from './components/Buttons/Delete'
import MultiSelect from './components/MultiSelect'
import {menuItemsOperations} from 'store/menuItems'
import './index.scss'

const rows = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'menuItems', numeric: false, disablePadding: false, label: 'menuItems' },
  { id: 'delete', numeric: false, disablePadding: false, label: 'Delete' },
];

class EnhancedTableHead extends React.Component {

  render() {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
          Is Multisync?
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
              >
                {row.label}
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};

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

let EnhancedTableToolbar = props => {
  const { classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {[classes.highlight]: false})}
    >
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          Manage Place Categories
        </Typography>
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  componentDidMount() {
    this.props.createData()
    this.props.fetchMenuItemNames()
  }

  handleClickCheckBox = (id) => {
    this.props.updateChanged(id, this.props.changed)
    this.props.toggleMultisync(id, this.props.placeCategories)
  };

  render() {
    const {classes, placeCategories, isLoading, updateChanged, changed, menuItemIsLoading, menuItemNames} = this.props;
    const emptyRows = 1;
    if (isLoading || menuItemIsLoading){
      return <Preloader />
    }
    return (
      <div className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              rowCount={placeCategories.length}
            />
            <TableBody>
              {
                placeCategories.map(placeCategory => {
                  const isMultisync = placeCategory.multisync
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isMultisync}
                      tabIndex={-1}
                      key={placeCategory.id}
                      selected={isMultisync}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isMultisync} onClick={() => this.handleClickCheckBox(placeCategory.id)}/>
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none"
                      onChange={() => updateChanged(placeCategory.id, changed)}>
                         <TextField name={placeCategory.name} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" >
                        <MultiSelect
                          selectedNames={placeCategory.menuItems}
                          placeCategoryId={placeCategory.id}
                          allNames={menuItemNames}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                      <DeleteButton />
                      </TableCell>
                    </TableRow>
                  );
                })
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='buttons'>
          <SubmitButton />
          <ResetButton />
        </div>
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  placeCategories: PropTypes.array.isRequired,
  changed: PropTypes.array.isRequired,
  toggleMultisync: PropTypes.func.isRequired,
  updateChanged: PropTypes.func.isRequired,
  createData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchMenuItemNames: PropTypes.func.isRequired,
  menuItemIsLoading: PropTypes.bool.isRequired,
  menuItemNames: PropTypes.array.isRequired,
};

const mapStateToProps = ({placeCategories, menuItems}) => ({
  classes: placeCategories.classes,
  placeCategories: placeCategories.placeCategories,
  changed: placeCategories.changed,
  isLoading: placeCategories.isLoading,
  menuItemNames: menuItems.names,
  menuItemIsLoading: menuItems.isLoading
})

const mapDispatchToProps = dispatch => ({
  createData: () => dispatch(placesCategoriesOperations.createData()),
  updateChanged: (id, changed) => dispatch(placesCategoriesOperations.updateChanged(id, changed)),
  toggleMultisync: (id, placeCategories) => dispatch(placesCategoriesOperations.toggleMultisync(id, placeCategories)),
  fetchMenuItemNames: () => dispatch(menuItemsOperations.fetchNames())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable))