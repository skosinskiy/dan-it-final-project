import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles/index'
import Paper from '@material-ui/core/Paper/index'
import InputBase from '@material-ui/core/InputBase/index'
import IconButton from '@material-ui/core/IconButton/index'
import SearchIcon from '@material-ui/icons/Search'
import Clear from '@material-ui/icons/Clear'

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
}

class SearchBar extends React.Component {

  componentDidMount() {
    this.setState({
      input: this.props.value
    })
  }

  state = {
    input: ''
  }

  handleChange = event => {
    this.setState({input: event.target.value})
  }

  clearInput = event => {
    this.setState({input: ''})
    this.props.searchFunc('', 0, this.props.size)
  }

  searchFunc = e => {
    e.persist()
    const {input} = this.state
    setTimeout(() => {
      if (this.state.input === input || e.key === 'Enter' || this.state.input === '') {
        this.props.searchFunc(this.state.input, 0, this.props.size)
      }
    }, 500)
  }

  render () {
    const {classes, placeholder} = this.props
    const {input} = this.state

    return (
      <Paper className={classes.root} elevation={1}>
        <InputBase
          onKeyUp={this.searchFunc}
          value={input}
          onChange={this.handleChange}
          className={classes.input}
          placeholder={placeholder}
        />
        <IconButton onClick={this.clearInput} className={classes.iconButton} aria-label="Search">
          {input.length > 0 ? <Clear/> : <SearchIcon/> }
        </IconButton>
      </Paper>
    )
  }
}


SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  searchFunc: PropTypes.func.isRequired
}

export default withStyles(styles)(SearchBar)
