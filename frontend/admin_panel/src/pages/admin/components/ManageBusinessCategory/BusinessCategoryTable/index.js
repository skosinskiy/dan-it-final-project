import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'

import {businessCategoryOperations} from 'store/businessCategory'
import Paper from '@material-ui/core/Paper/Paper'
import {Table} from '@material-ui/core'
import TableHead from '@material-ui/core/TableHead/TableHead'
import TableRow from '@material-ui/core/TableRow/TableRow'
import TableCell from '@material-ui/core/TableCell/TableCell'
import TableBody from '@material-ui/core/TableBody/TableBody'
import TableCellButtons from '../../../../../components/TableCellButtons'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3
  },

  table: {
    tableLayout: 'fixed'
  }
})

class BusinessCategoryTable extends Component {
  render () {
    const {classes, deleteBusinessCategory, businessCategories} = this.props
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <colgroup>
            <col style={{width:'25%'}}/>
            <col style={{width:'25%'}}/>
            <col style={{width:'25%'}}/>
            <col style={{width:'25%'}}/>
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Parent Category</TableCell>
              <TableCell/>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessCategories.map(businessCategory => (
              <TableRow key={businessCategory.id} hover>
                <TableCell component="th" scope="row">
                  {businessCategory.name}
                </TableCell>
                <TableCell>{businessCategory.description}</TableCell>
                <TableCell>{businessCategory.parentCategory ? businessCategory.parentCategory.name : ''}</TableCell>
                <TableCellButtons
                  editLink={`/admin/business-categories/${businessCategory.id}`}
                  deleteFunction={() => deleteBusinessCategory(businessCategory.id)}
                />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

BusinessCategoryTable.propTypes = {
  classes: PropTypes.object.isRequired,
  businessCategories: PropTypes.array.isRequired,
  deleteBusinessCategory: PropTypes.func.isRequired,
}

const mapStateToProps = ({businessCategory}) => {
  return {
    businessCategories: businessCategory.allBusinessCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBusinessCategory: (categoryId) => dispatch(businessCategoryOperations.deleteBusinessCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BusinessCategoryTable))
