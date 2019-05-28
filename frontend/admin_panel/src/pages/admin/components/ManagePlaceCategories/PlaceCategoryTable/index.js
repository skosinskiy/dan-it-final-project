import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {Table} from '@material-ui/core'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import TableCellButtons from 'components/TableCellButtons'
import {placeCategoriesOperations} from '../../../../../store/placeCategory'
import Preloader from '../../../../../components/Preloader'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    tableLayout: 'fixed'
  }
})

class PlaceCategories extends Component {
  componentDidMount() {
    this.props.getAllPlaceCategories()
  }

  render() {

    const {classes, arePlaceCategoriesLoading, placeCategories, deletePlaceCategory} = this.props

    if (arePlaceCategoriesLoading) {
      return (
        <div style={{height: 'calc(100vh - 200px)'}}>
          <Preloader/>
        </div>)
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <colgroup>
            <col style={{width: '12%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '12%'}}/>
            <col style={{width: '16%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell className={classes.firstCell}>Is Multisync?</TableCell>
              <TableCell className={classes.cell}>Allow Messages?</TableCell>
              <TableCell className={classes.cell}>Add paired users contacts?</TableCell>
              <TableCell className={classes.cell}>Name</TableCell>
              <TableCell className={classes.cell}>Description</TableCell>
              <TableCell className={classes.cell}>Business Categories</TableCell>
              <TableCell className={classes.cell}>Layout Items</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {placeCategories.map(placeCategory => {
              const {
                multisync, allowMessages, shouldAddPairedUsers, layoutItems,
                businessCategories: selectedBusinessCategories, name, description, id
              } = placeCategory
              return (
                <TableRow key={placeCategory.id} hover>
                  <TableCell component="th" scope="row" padding="checkbox">
                    <Checkbox checked={multisync} disabled/>
                  </TableCell>
                  <TableCell component="th" scope="row" padding="checkbox">
                    <Checkbox checked={allowMessages} disabled/>
                  </TableCell>
                  <TableCell component="th" scope="row" padding="checkbox">
                    <Checkbox checked={shouldAddPairedUsers} disabled/>
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{selectedBusinessCategories.map(businessCategory => businessCategory.name).join(', ')}</TableCell>
                  <TableCell>{layoutItems.join(', ')}</TableCell>
                  <TableCellButtons
                    editLink={`/admin/place-categories/${id}`}
                    deleteFunction={() => deletePlaceCategory(placeCategory.id)}
                  />
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

PlaceCategories.propTypes = {
  getAllPlaceCategories: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  placeCategories: PropTypes.array.isRequired,
  arePlaceCategoriesLoading: PropTypes.bool.isRequired,
  deletePlaceCategory: PropTypes.func.isRequired,
}

const mapStateToProps = ({placeCategories}) => {
  return {
    placeCategories: placeCategories.placeCategories,
    arePlaceCategoriesLoading: placeCategories.arePlaceCategoriesLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllPlaceCategories: () => dispatch(placeCategoriesOperations.getAllPlaceCategories()),
    deletePlaceCategory: placeCategoryId => dispatch(placeCategoriesOperations.deletePlaceCategory(placeCategoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceCategories))
