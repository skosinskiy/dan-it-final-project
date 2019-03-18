import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import BuildingItem from './BuildingItem/index'
import './buildingsList.scss'
import { SET_BUILDING_TYPES } from '../../../actions/buildings'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  },
  button: {
    margin: theme.spacing.unit
  }
})

class BuildingsList extends React.Component {
  componentDidMount () {

  }

  saveBuildingsTypes = () => {
    console.log(this.props.changedBuildingsList)
    this.props.buildingsListByName.forEach((building) => {
      if (this.props.changedBuildingsList.has(building.id)) {
        let types = building.types
        axios.put(`api/buildings/${building.id}/types`, types)
      }
    })
    this.props.updateBuildingsList()
  }

  render () {
    const { classes } = this.props
    const buildingsListByName = this.props.buildingsListByName.map((item) => {
      return <BuildingItem building={item} key={item.id}/>
    })

    return (
      <>
        <div className={classes.root}>
          <ul className="building-list">
            {buildingsListByName}
          </ul>
        </div>
        <div className="building-list-buttons">
          <NavLink to={'/admin'}><Button onClick={this.saveBuildingsTypes} variant="contained" color="primary" className={classes.button}>
            Save
          </Button>
          </NavLink>
          <NavLink to={'/admin'}>
            <Button onClick={() => this.props.updateBuildingsList()} variant="contained" color="secondary" className={classes.button}>
            Exit
            </Button>
          </NavLink>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    buildingsListByName: state.buildings.buildingsListByName,
    changedBuildingsList: state.buildings.changedBuildingsList,
    buildingTypes: state.buildings.buildingTypes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBuildingsList: () => {
      let updatedBuildingList = []
      let changedBuildingsList = new Set()
      dispatch({type: SET_BUILDING_TYPES, payload: {updatedBuildingList, changedBuildingsList}})
    }
  }
}

BuildingsList.propTypes = {
  classes: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(BuildingsList))