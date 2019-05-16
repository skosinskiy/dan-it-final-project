import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'
import {eventCategoryOperations} from 'store/eventCategory'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {Table} from '@material-ui/core'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox';
import TableCellButtons from 'components/TableCellButtons'
import {placesCategoriesOperations} from 'store/placeCategory'
import Preloader from 'components/Preloader';

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
  componentDidMount () {
    this.props.reloadData()
  }

  render () {

    if (this.props.isLoading) {
      return <Preloader/>
    }

    // const {classes, deletePlaceCategory, placeCategories} = this.props
    const {classes, placeCategories} = this.props
    const rows = [
      { id: 'multisync', label: 'Is Multisync?' },
      { id: 'allowMessages', label: 'Allow Messages?' },
      { id: 'name', label: 'Name' },
      { id: 'description', grow: 2, label: 'Description' },
      { id: 'businessCategories', label: 'BusinessCategories' },
      { id: 'layoutItems', label: 'LayoutItems' },
      { id: 'buttons', label: '' },
    ];
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <colgroup>
            {rows.map((row, i) => (
              <col key={'header' + i} style={{width:`${100 * (row.grow || 1) / rows.length}%`}}/>
            ))}
          </colgroup>
          <TableHead>
            <TableRow>
              {rows.map((row, i) => (
                <TableCell key={'label' + i}>{row.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {placeCategories.map(placeCategory => {
              const {multisync, allowMessages, layoutItems, businessCategories: selectedBusinessCategories,
                name, description} = placeCategory
                return (
                <TableRow key={placeCategory.id} hover>
                <TableCell component="th" scope="row" padding="checkbox">
                  <Checkbox checked={multisync} disabled/>
                </TableCell>
                <TableCell component="th" scope="row" padding="checkbox">
                  <Checkbox checked={allowMessages} disabled/>
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{description}</TableCell>
                <TableCell>{selectedBusinessCategories.map(businessCategory => businessCategory.name).join(', ')}</TableCell>
                <TableCell>{layoutItems.join(', ')}</TableCell>
                <TableCellButtons
                  // editLink={`/admin/event-categories/${eventCategory.id}`}
                  // deleteFunction={() => deleteEventCategory(eventCategory.id)}
                  editLink={`#`}
                  deleteFunction={() => undefined}
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
  classes: PropTypes.object.isRequired,
  deleteEventCategory: PropTypes.func.isRequired,
  placeCategories: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  reloadData: PropTypes.func.isRequired,
}

const mapStateToProps = ({placeCategories}) => {
  return {
    placeCategories: placeCategories.placeCategories,
    isLoading: placeCategories.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteEventCategory: (categoryId) => dispatch(eventCategoryOperations.deleteEventCategory(categoryId)),
    reloadData: () => dispatch(placesCategoriesOperations.reloadData()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PlaceCategories))