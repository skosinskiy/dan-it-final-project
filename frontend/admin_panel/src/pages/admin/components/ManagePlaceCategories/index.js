import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { placesCategoriesOperations } from 'store/placeCategory'
import { connect } from 'react-redux'
import Preloader from 'components/Preloader';
import AddButton from './components/Buttons/Add'
import SubmitButton from './components/Buttons/Submit'
import ResetButton from './components/Buttons/Reset'
import TextField from './components/TextField'
import DeleteButton from './components/Buttons/Delete'
import MultiSelect from './components/MultiSelect'
import { menuItemsOperations } from 'store/menuItems'
import {EnhancedTableHead}  from './components/EnhancedTableHead'
import EnhancedTableToolbar  from './components/EnhancedTableToolbar'
import './index.scss'

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

  handleClickCheckBox = (key) => {
    this.props.updateChanged(key, this.props.placeCategories)
    this.props.toggleMultisync(key, this.props.placeCategories)
  };

  render() {
    const { classes, placeCategories, isLoading, updateChanged, menuItemIsLoading, menuItemNames } = this.props;
    const emptyRows = 1;
    if (isLoading || menuItemIsLoading) {
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
                      key={placeCategory.key}
                      selected={isMultisync}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isMultisync} onClick={() => this.handleClickCheckBox(placeCategory.key)} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none"
                        onChange={() => updateChanged(placeCategory.key, placeCategories)}>
                        <TextField name={placeCategory.name} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none" >
                        <MultiSelect
                          selectedNames={placeCategory.menuItems}
                          placeCategoryKey={placeCategory.key}
                          allNames={menuItemNames}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <DeleteButton placeCategoryKey={placeCategory.key} />
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
          <AddButton />
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
  toggleMultisync: PropTypes.func.isRequired,
  updateChanged: PropTypes.func.isRequired,
  createData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchMenuItemNames: PropTypes.func.isRequired,
  menuItemIsLoading: PropTypes.bool.isRequired,
  menuItemNames: PropTypes.array.isRequired,
};

const mapStateToProps = ({ placeCategories, menuItems }) => ({
  classes: placeCategories.classes,
  placeCategories: placeCategories.placeCategories,
  isLoading: placeCategories.isLoading,
  menuItemNames: menuItems.names,
  menuItemIsLoading: menuItems.isLoading
})

const mapDispatchToProps = dispatch => ({
  createData: () => dispatch(placesCategoriesOperations.createData()),
  updateChanged: (key, placeCategories) => dispatch(placesCategoriesOperations.updateChanged(key, placeCategories)),
  toggleMultisync: (key, placeCategories) => dispatch(placesCategoriesOperations.toggleMultisync(key, placeCategories)),
  fetchMenuItemNames: () => dispatch(menuItemsOperations.fetchNames())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable))