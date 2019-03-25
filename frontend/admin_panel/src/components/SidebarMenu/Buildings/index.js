import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import { getBuildings } from '../../../actions/building/buildings'
import BuildingItem from './BuildingItem'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },

  buttons: {
    textDecoration: 'none',
    marginRight: '10px'
  }
})

class Buildings extends Component {
  componentDidMount () {
    const {getAllBuildings} = this.props
    getAllBuildings()
  }

  render () {
    const { classes, buildings } = this.props
    const buildingList = buildings.map((building) => {
      return <BuildingItem key={building.id} place={building}/>
    })
    return (
      <div className="buildingList">
        <List className={classes.root}>
          {buildingList}
        </List>
        <NavLink to={'/admin/buildings/add-new'} className={classes.buttons}>
          <Button variant="contained" color="primary" className={classes.button}>Add New Building</Button>
        </NavLink>
      </div>
    )
  }
}

Buildings.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    buildings: [...state.buildings.buildings]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBuildings: () => dispatch(getBuildings())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Buildings))