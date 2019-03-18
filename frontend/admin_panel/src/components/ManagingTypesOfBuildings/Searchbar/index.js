import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { GET_BUILDINGS_BY_NAME } from '../../../actions/buildings'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
}

class BuildingNameSearchBar extends React.Component {
  state = {
    name: ''
  }

  handleChange = event => {
    this.setState({name: event.target.value})
  }

  findBuildingsByName = (e) => {
    if (e.key === 'Enter') {
      axios.get(`/api/buildings?name=${this.state.name}`)
        .then(res => {
          this.props.getBuidingsByName(res.data)
        })
    }
  }

  render () {
    console.log()
    const { classes } = this.props
    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase onKeyPress={this.findBuildingsByName} value={this.state.name}
          onChange={this.handleChange} className={classes.input} placeholder="Search building by name"/>
        <IconButton className={classes.iconButton} aria-label="Search">
          <SearchIcon/>
        </IconButton>
      </Paper>
    )
  }
}

BuildingNameSearchBar.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    buildingsListByName: state.buildings.buildingsListByName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBuildingsByName: (buildings) => {
      dispatch({type: GET_BUILDINGS_BY_NAME, payload: {buildings: buildings}})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BuildingNameSearchBar))