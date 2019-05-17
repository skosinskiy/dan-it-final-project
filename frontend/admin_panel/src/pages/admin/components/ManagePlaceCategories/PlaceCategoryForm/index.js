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
import SubmitButton from './components/Buttons/Submit'
import Name from './components/Name'
import BusinessCategoriesMultiSelect from './components/BusinessCategoriesMultiSelect'
import LayuoutMultiSelect from './components/LayoutMultiSelect'
import { EnhancedTableHead } from './components/EnhancedTableHead'
import EnhancedTableToolbar from './components/EnhancedTableToolbar'
import './index.scss'
import ResetButton from './components/Buttons/Reset'
import Desciption from './components/Description';
import layoutItems from 'constants/layoutItems'
import Preloader from 'components/Preloader';

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
class PlaceCategoryTable extends React.Component {

  componentDidMount(){
    try {
      const id = +window.location.pathname.match(/\d+$/)[0]
      this.props.loadPlaceCategory(id);
    } catch (err) {
      this.props.addSinglePlaceCategory()
    }
  }
   
  checkBoxTypes = {
    MULTISYNC: 'multisync',
    ALLOW_MESSAGES: 'allowMessages',
  }

  handleClickCheckBox = checkBoxType => {
    this.props.toggleCheckBox(checkBoxType)
  }

  handleClickMultisync = () => {
    this.handleClickCheckBox(this.checkBoxTypes.MULTISYNC)
  }

  handleClickAllowMessages = () => {
    this.handleClickCheckBox(this.checkBoxTypes.ALLOW_MESSAGES)
  }

  render() {

    if (this.props.isLoading) {
      return <Preloader/>
    }

    const {classes} = this.props
    const {multisync, allowMessages, layoutItems, businessCategories: selectedBusinessCategories, name, key,
      description} = this.props.editedPlaceCategory
    const emptyRows = 1;
    return (
      <div className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              rowCount={2}
            />
            <TableBody>
                  <Fragment key={key * Math.random()}>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={key}
                      style={{borderBottomStyle: "hidden"}}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={multisync} onClick={() => this.handleClickMultisync(key)} />
                      </TableCell>
                      <TableCell padding="checkbox">
                        <Checkbox checked={allowMessages} onClick={() => this.handleClickAllowMessages(key)} />
                      </TableCell>
                      <TableCell scope="row" padding="none">
                        <Name name={name} placeCategoryKey={key} />
                      </TableCell>
                      <TableCell scope="row" padding="none">
                        <BusinessCategoriesMultiSelect
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
                    </TableRow>
                    <Desciption _Key={key} description={description}/>
                  </Fragment>
                
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

PlaceCategoryTable.propTypes = {
  classes: PropTypes.object.isRequired,
  editedPlaceCategory: PropTypes.object.isRequired,
  toggleCheckBox: PropTypes.func.isRequired,
  fetchParentBusinessCategories: PropTypes.func.isRequired,
  isLoading:  PropTypes.bool.isRequired,
  addSinglePlaceCategory:  PropTypes.func.isRequired,
  loadPlaceCategory:  PropTypes.func.isRequired,
}

const mapStateToProps = ({ placeCategories }) => ({
  classes: placeCategories.classes,
  isLoading: placeCategories.placeCategoryFormIsLoading,
  editedPlaceCategory: placeCategories.editedPlaceCategory,
})

const mapDispatchToProps = dispatch => ({
  updateChanged: (key, placeCategories) =>
    dispatch(placesCategoriesOperations.updateChanged(key, placeCategories)),
  toggleCheckBox: (key, checkBoxType, placeCategories) =>
    dispatch(placesCategoriesOperations.toggleCheckBox(key, checkBoxType, placeCategories)),
  fetchParentBusinessCategories: () =>
    dispatch(placesCategoriesOperations.fetchParentBusinessCategories()),
  addSinglePlaceCategory: () => dispatch(placesCategoriesOperations.addSinglePlaceCategory()),
  loadPlaceCategory: (id) => dispatch(placesCategoriesOperations.loadPlaceCategory(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceCategoryTable))