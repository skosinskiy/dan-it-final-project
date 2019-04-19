import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'

import {eventCategoryOperations} from 'store/eventCategory'
import Preloader from '../../../../../components/Preloader'
import ImageUploader from '../../../../../components/ImageUploader'

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '20%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },

  buttonLink: {
    marginRight: '10px',
    textDecoration: 'none'
  },

  buttons: {
    margin: '8px'
  }

})

const emptyCategory = {
  name: '',
  description: '',
  parentCategory: null
}

class EventCategoryForm extends React.Component {
  constructor (props) {
    super(props)

    const imageUrl = props.category !== undefined ? props.category.imageUrl : null
    const imageKey = props.category !== undefined ? props.category.imageKey : null

    this.state = {
      editedCategory: props.category !== undefined ? props.category : emptyCategory,
      eventCategoryImage: props.category !== undefined && imageUrl !== null ? [{ imageUrl, imageKey}] : []
    }
  }

  componentDidMount () {
    const {category, match, getAllEventCategories} = this.props
    const creatingNewCategory = !match.params.categoryId

    if (!creatingNewCategory && !category) {
      getAllEventCategories()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.category && nextProps.category !== this.props.category) {
      this.setState({editedCategory: nextProps.category})
    }
  }

  saveCategory = () => {
    const {saveCategory} = this.props

    saveCategory(this.state.editedCategory, this.state.eventCategoryImage[0])
  }

  handleChange = (event, propName) => {
    const {categories} = this.props

    const value = propName === 'parentCategory'
      ? categories.find(category => category.id === event.target.value)
      : event.target.value

    this.setState({editedCategory: {...this.state.editedCategory, [propName]: value}})
  }

  onFileChange = (images) => {
    const newEventCategoryImage = images.map((file) => Object.assign(file, {
      imageUrl: URL.createObjectURL(file),
      imageKey: null
    }))
    this.setState(() => {
      return {
        eventCategoryImage: newEventCategoryImage
      }
    })
  }

  onImageReset = (image) => {
    const newEventCategoryImage = this.state.eventCategoryImage.filter(elem => elem !== image)
    this.setState({
      ...this.state,
      eventCategoryImage: newEventCategoryImage,
    })
  }

  render () {
    const {classes, match, categories, category} = this.props
    const {editedCategory, eventCategoryImage} = this.state
    const categoryId = match.params.categoryId

    if (categoryId && !category) {
      return <Preloader/>
    }

    const categoryOptions = categories
      .filter(c => c.id.toString() !== categoryId)
      .filter(c => c.parentCategory ? c.parentCategory.id.toString() !== categoryId : true)
      .concat([emptyCategory])
      .map(category => (
        <MenuItem key={category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))

    return (
      <div className={classes.container}>
        <TextField
          label='Event Category Name'
          style={{margin: 8}}
          margin='normal'
          variant='outlined'
          InputLabelProps={{
            shrink: true
          }}
          value={editedCategory.name}
          onChange={(e) => this.handleChange(e, 'name')}
        />

        <TextField
          id="outlined-required"
          label="Description"
          style={{margin: 8}}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true
           }}
          value={editedCategory.description}
          onChange={(e) => this.handleChange(e, 'description')}
         />


        <TextField
          select
          className={classes.textField}
          value={editedCategory.parentCategory && editedCategory.parentCategory.id}
          onChange={(e) => this.handleChange(e, 'parentCategory')}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText='Select parent category'
          margin='normal'
          variant='filled'
        >
          {categoryOptions}
        </TextField>

        <ImageUploader  images={eventCategoryImage}
                        onFileChange={this.onFileChange}
                        onReset={this.onImageReset}
                        multiple={false}/>

        <div className={classes.buttons}>
          <NavLink to={'/admin/event-categories'} className={classes.buttonLink}>
            <Button
              onClick={this.saveCategory}
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Save
            </Button>
          </NavLink>
          <NavLink to={'/admin/event-categories'} className={classes.buttonLink}>
            <Button variant='contained' color='secondary' className={classes.button}>
              Exit
            </Button>
          </NavLink>
        </div>
      </div>
    )
  }
}

EventCategoryForm.propTypes = {
  classes: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  getAllEventCategories: PropTypes.func.isRequired,
  saveCategory: PropTypes.func.isRequired
}

const mapStateToProps = (state, props) => {
  const category = state.eventCategory.allEventCategories.find(category => category.id === parseInt(props.match.params.categoryId))

  return {
    categories: state.eventCategory.allEventCategories,
    category: category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEventCategories: () => dispatch(eventCategoryOperations.getAllEventCategories()),
    saveCategory: (category, file) => dispatch(eventCategoryOperations.saveCategory(category, file))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventCategoryForm))
