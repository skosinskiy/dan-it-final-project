import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles/index'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ImageIcon from '@material-ui/icons/Image'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

class Places extends Component {
  editPlace = () => {
    
  }

  render () {
    const {classes, place} = this.props
    return (
      <ListItem>
        <Avatar>
          <ImageIcon />
        </Avatar>
        <ListItemText primary={place.title} secondary={place.address} />
        <Button onClick={this.editPlace} variant="contained" color="primary" className={classes.button}>Edit</Button>
        <Button variant="contained" color="secondary" className={classes.button}>Delete</Button>
      </ListItem>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Places))