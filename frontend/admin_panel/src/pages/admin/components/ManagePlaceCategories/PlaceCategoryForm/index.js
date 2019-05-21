import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Preloader from 'components/Preloader'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { placesCategoriesOperations } from 'store/placeCategory'
import Desciption from './components/Description'
import { EnhancedTableHead } from './components/EnhancedTableHead'
import MultiSelect from './components/MultiSelect'
import Name from './components/Name'
import './index.scss'
import Grid from '@material-ui/core/Grid'
import FormButtons from "components/FormButtons";

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

class PlaceCategoryTable extends React.Component {

  componentDidMount(){
    const matcher = window.location.pathname.match(/\d+$/)
    const id = matcher ? matcher[0] : null
    this.props.createOrGetPlaceCategory(id)
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

    if (this.props.isLoading || this.props.isHttpRequestPending) {
      return <Preloader/>
    }

    const {classes, availableBusinessCategories, availableLayoutItems} = this.props
    const {multisync, allowMessages, layoutItems, businessCategories: selectedBusinessCategories, name, key,
      description} = this.props.editedPlaceCategory
    const emptyRows = 1;
    return (
      <div className={classes.root}>
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
                        <MultiSelect
                          selectedCategories={selectedBusinessCategories}
                          availableCategories={availableBusinessCategories}
                          flag={'businessCategories'}
                        />
                      </TableCell>
                      <TableCell scope="row" padding="none">
                        <MultiSelect
                          selectedCategories={layoutItems}
                          availableCategories={availableLayoutItems}
                          flag={'layoutItems'}
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
        {/* <div className='buttons'>
          <SubmitButton />
          <ResetButton />
        </div> */}
        <Grid item xs={12}>
          <FormButtons
           // saveFunction={(e) => this.updateEvent(e)}
          saveFunction={this.props.processPutOrGet}
          cancelLink={'/admin/place-categories'}
          />
        </Grid>
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
  isHttpRequestPending: PropTypes.bool.isRequired,
  createOrGetPlaceCategory:  PropTypes.func.isRequired,
  processPutOrGet:  PropTypes.func.isRequired,
  availableBusinessCategories:  PropTypes.array.isRequired,
  availableLayoutItems:  PropTypes.array.isRequired,
}

const mapStateToProps = ({ placeCategories }) => ({
  classes: placeCategories.classes,
  isLoading: placeCategories.isPlaceCategoryFormLoading,
  editedPlaceCategory: placeCategories.editedPlaceCategory,
  availableBusinessCategories: placeCategories.availableBusinessCategories,
  availableLayoutItems: placeCategories.availableLayoutItems,
  isHttpRequestPending: placeCategories.isHttpRequestPending,
})

const mapDispatchToProps = dispatch => ({
  updateChanged: (key, placeCategories) =>
    dispatch(placesCategoriesOperations.updateChanged(key, placeCategories)),
  toggleCheckBox: (key, checkBoxType, placeCategories) =>
    dispatch(placesCategoriesOperations.toggleCheckBox(key, checkBoxType, placeCategories)),
  fetchParentBusinessCategories: () =>
    dispatch(placesCategoriesOperations.fetchParentBusinessCategories()),
  createOrGetPlaceCategory: (id) => dispatch(placesCategoriesOperations.createOrGetPlaceCategory(id)),
  processPutOrGet: () => dispatch(placesCategoriesOperations.processPutOrGet()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceCategoryTable))