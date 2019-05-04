import React from 'react'
import PropTypes from 'prop-types'
import {NavLink, Redirect} from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux'

import {eventCategoryOperations} from 'store/eventCategory'
import Preloader from '../../../../../components/Preloader'
import ImageUploader from '../../../../../components/ImageUploader'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography'

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
      eventCategoryImage: props.category !== undefined && imageUrl !== null ? [{ imageUrl, imageKey}] : [],
      isDataSubmitted: false
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
      const imageUrl = nextProps.category.imageUrl
      const imageKey = nextProps.category.imageKey

      this.setState({
        editedCategory: nextProps.category,
        eventCategoryImage: imageUrl !== null ? [{ imageUrl, imageKey}] : []
      })
    }
  }

  saveCategory = () => {
    const {saveCategory} = this.props
    saveCategory(this.state.editedCategory, this.state.eventCategoryImage[0]).then(() =>
      this.setState({
        isDataSubmitted: true
      })
    )

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

    const {match, categories, isEventCategoriesLoading} = this.props
    const {editedCategory, eventCategoryImage, isDataSubmitted} = this.state
    const categoryId = match.params.categoryId

    if (isDataSubmitted) {
      return <Redirect to={'/admin/event-categories'} />
    }

    if (isEventCategoriesLoading) {
      return <Preloader/>
    }

    const categoryOptions = categories
      .filter(c => c.id.toString() !== categoryId)
      .filter(c => c.parentCategory ? c.parentCategory.id.toString() !== categoryId : true)
      .concat([emptyCategory])
      .map(category => (
        <MenuItem key={category.id ? category.id : 0} value={category.id}>
          {category.name}
        </MenuItem>
      ))

    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Event Category Name'
              fullWidth
              variant='outlined'
              InputLabelProps={{
                shrink: true
              }}
              value={editedCategory.name}
              onChange={(e) => this.handleChange(e, 'name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true
              }}
              value={editedCategory.description ? editedCategory.description : ''}
              onChange={(e) => this.handleChange(e, 'description')}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Parent Category'
              fullWidth
              select
              variant='outlined'
              InputLabelProps={{
                shrink: true
              }}
              value={editedCategory.parentCategory ? editedCategory.parentCategory.id : ''}
              onChange={(e) => this.handleChange(e, 'parentCategory')}
            >
              {categoryOptions}
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography gutterBottom={true} color='textSecondary'>
              Choose event category background image
            </Typography>
            <ImageUploader  images={eventCategoryImage}
                            onFileChange={this.onFileChange}
                            onReset={this.onImageReset}
                            multiple={false}/>

            <Grid container justify="center" spacing={8}>
              <Grid item>
                <Button onClick={this.saveCategory} variant='outlined' color='primary'>
                  Save
                </Button>
              </Grid>
              <Grid item>
                <NavLink style={{textDecoration: 'none'}} to={'/admin/event-categories'}>
                  <Button variant='outlined' color='secondary'>
                    Cancel
                  </Button>
                </NavLink>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

EventCategoryForm.propTypes = {
  category: PropTypes.object,
  match: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  getAllEventCategories: PropTypes.func.isRequired,
  saveCategory: PropTypes.func.isRequired,
  isEventCategoriesLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state, props) => {
  const category = state.eventCategory.allEventCategories.find(category => category.id === parseInt(props.match.params.categoryId))

  return {
    categories: state.eventCategory.allEventCategories,
    isEventCategoriesLoading: state.eventCategory.isEventCategoriesLoading,
    category: category
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEventCategories: () => dispatch(eventCategoryOperations.getAllEventCategories()),
    saveCategory: (category, file) => dispatch(eventCategoryOperations.saveCategory(category, file))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventCategoryForm)
