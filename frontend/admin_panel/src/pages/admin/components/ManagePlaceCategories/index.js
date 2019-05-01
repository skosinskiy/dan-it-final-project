import React, { Fragment } from 'react';
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
import Name from './components/Name'
import DeleteButton from './components/Buttons/Delete'
import MultiSelect from './components/MultiSelect'
import LayuoutMultiSelect from './components/LayoutMultiSelect'
import { EnhancedTableHead } from './components/EnhancedTableHead'
import EnhancedTableToolbar from './components/EnhancedTableToolbar'
import './index.scss'
import ResetButton from './components/Buttons/Reset'
import Desciption from './components/Description';
import layoutItems from '../../../../constants/layoutItems'

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

const allLayoutItems = Object.values(layoutItems)

class EnhancedTable extends React.Component {
  componentDidMount() {
    this.props.reloadData()
  }

  handleChange = (key) => {
    this.props.updateChanged(key, this.props.placeCategories)
  }

  handleClickCheckBox = (key) => {
    this.handleChange(key)
    this.props.toggleMultisync(key, this.props.placeCategories)
  }

  render() {
    const { classes, placeCategories, isLoading } = this.props;
    const emptyRows = 1;
    if (isLoading) {
      return <Preloader />
    }
    return (
      <div className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              rowCount={placeCategories.length * 2}
            />
            <TableBody>
              {
                placeCategories.map(placeCategory => {
                  const {multisync, layoutItems, businessCategories: selectedBusinessCategories, name, key,
                    description} = placeCategory
                  return (
                    <Fragment key={key * Math.random()}>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={key}
                        style={{borderBottomStyle: "hidden"}}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={multisync} onClick={() => this.handleClickCheckBox(key)} />
                        </TableCell>
                        <TableCell scope="row" padding="none">
                          <Name name={name} placeCategoryKey={key} />
                        </TableCell>
                        <TableCell scope="row" padding="none">
                          <MultiSelect
                            selectedBusinessCategories={selectedBusinessCategories}
                            placeCategoryKey={key}
                          />
                        </TableCell>
                        <TableCell scope="row" padding="none">
                          <LayuoutMultiSelect
                            selectedMenuItems={layoutItems ? layoutItems : []}
                            placeCategoryKey={key}
                            allNames={allLayoutItems}
                            flag={'layoutItem'}
                          />
                        </TableCell>
                        <TableCell scope="row" padding="none">
                          <DeleteButton placeCategoryKey={key} />
                        </TableCell>
                      </TableRow>
                      <Desciption _Key={key} description={description}/>
                    </Fragment>
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
  reloadData: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchParentBusinessCategories: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
}

const mapStateToProps = ({ placeCategories }) => ({
  classes: placeCategories.classes,
  placeCategories: placeCategories.placeCategories,
  isLoading: placeCategories.isLoading,
})

const mapDispatchToProps = dispatch => ({
  reloadData: () => dispatch(placesCategoriesOperations.reloadData()),
  updateChanged: (key, placeCategories) =>
    dispatch(placesCategoriesOperations.updateChanged(key, placeCategories)),
  toggleMultisync: (key, placeCategories) =>
    dispatch(placesCategoriesOperations.toggleMultisync(key, placeCategories)),
  fetchParentBusinessCategories: () =>
    dispatch(placesCategoriesOperations.fetchParentBusinessCategories()),
  updateDescription: (key, placeCategories, value) =>
    dispatch(placesCategoriesOperations.updateDescription(key, placeCategories, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable))
