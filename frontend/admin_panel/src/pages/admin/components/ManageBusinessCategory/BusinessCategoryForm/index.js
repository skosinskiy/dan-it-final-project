import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import {businessCategoryOperations} from 'store/businessCategory'
import Preloader from '../../../../../components/Preloader'
import ImageUploader from '../../../../../components/ImageUploader'
import Grid from '@material-ui/core/Grid/Grid'
import FormButtons from '../../../../../components/FormButtons'
import {Redirect} from 'react-router-dom'

const emptyCategory = {
  name: null,
  parentCategory: null
}

class BusinessCategoryForm extends React.Component {
  constructor(props) {
    super(props)

    const isCategoryPresent = props.category !== undefined

    const imageUrl = isCategoryPresent ? props.category.imageUrl : null
    const imageKey = isCategoryPresent ? props.category.imageKey : null
    const iconUrl = isCategoryPresent ? props.category.iconUrl : null
    const iconKey = isCategoryPresent ? props.category.iconKey : null

    this.state = {
      editedCategory: isCategoryPresent ? props.category : emptyCategory,
      businessCategoryImage: imageUrl ? [{imageUrl, imageKey}] : [],
      businessCategoryIcon: iconUrl ? [{'imageUrl': iconUrl, 'imageKey': iconKey}] : [],
      isDataSubmitted: false
    }
  }

  componentDidMount() {
    const {category, match, getAllBusinessCategories} = this.props
    const creatingNewCategory = !match.params.categoryId

    if (!creatingNewCategory && !category) {
      getAllBusinessCategories()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.category && nextProps.category !== this.props.category) {

      const imageUrl = nextProps.category.imageUrl
      const imageKey = nextProps.category.imageKey
      const iconUrl = nextProps.category.iconUrl
      const iconKey = nextProps.category.iconKey

      this.setState({
        editedCategory: nextProps.category,
        businessCategoryImage: imageUrl ? [{imageUrl, imageKey}] : [],
        businessCategoryIcon: iconUrl ? [{'imageUrl': iconUrl, 'imageKey': iconKey}] : []
      })
    }
  }

  saveCategory = () => {
    const {saveCategory} = this.props
    saveCategory(
      this.state.editedCategory,
      this.state.businessCategoryImage[0],
      this.state.businessCategoryIcon[0]).then(() => {
        this.setState({
          isDataSubmitted: true
        })
    })
    // console.log(saveCategory(
    //   this.state.editedCategory,
    //   this.state.businessCategoryImage[0],
    //   this.state.businessCategoryIcon[0]))
  }

  handleChange = (event, propName) => {
    const {categories} = this.props

    const value = propName === 'parentCategory'
      ? categories.find(category => category.id === event.target.value)
      : event.target.value

    this.setState({editedCategory: {...this.state.editedCategory, [propName]: value}})
  }

  onFileChange = (images, propName) => {
    const newBusinessCategoryImage = images.map((file) => Object.assign(file, {
      imageUrl: URL.createObjectURL(file),
      imageKey: null
    }))
    this.setState(() => {
      return {
        [propName]: newBusinessCategoryImage
      }
    })
  }

  onMainPhotoSelect = (selectedImage) => {
    const newBusinessCategoryImage = this.state.businessCategoryImage.map(image => {
      image.isMainImage = image === selectedImage
      return image
    })

    this.setState(() => {
      return {
        businessCategoryImage: newBusinessCategoryImage
      }
    })
  }

  onImageReset = (propName) => {
    this.setState({
      ...this.state,
      [propName]: []
    })
  }

  render() {
    const {match, categories, isLoading} = this.props
    const {editedCategory, businessCategoryImage, businessCategoryIcon, isDataSubmitted} = this.state
    const categoryId = match.params.categoryId

    if (isDataSubmitted) {
      return <Redirect to={'/admin/business-categories'}/>
    }

    if (isLoading) {
      return <Preloader/>
    }

    const categoryOptions = categories
      .filter(c => c.id.toString() !== categoryId)
      .filter(c => c.parentCategory ? c.parentCategory.id.toString() !== categoryId : true)
      .concat([emptyCategory])
      .map(category => (
        <MenuItem key={0 && category.id} value={category.id}>
          {category.name}
        </MenuItem>
      ))

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Business Category Name'
            fullWidth
            variant='outlined'
            value={editedCategory.name ? editedCategory.name : ''}
            onChange={(e) => this.handleChange(e, 'name')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            fullWidth
            variant="outlined"
            value={editedCategory.description ? editedCategory.description : ''}
            onChange={(e) => this.handleChange(e, 'description')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Parent Category'
            select
            fullWidth
            value={editedCategory.parentCategory ? editedCategory.parentCategory.id : ''}
            onChange={(e) => this.handleChange(e, 'parentCategory')}
            variant='outlined'
          >
            {categoryOptions}
          </TextField>
        </Grid>

        <Grid item xs={6}/>

        <Grid item xs={12} sm={6}>
          <ImageUploader
            images={businessCategoryImage}
            onFileChange={(images) => this.onFileChange(images, 'businessCategoryImage')}
            onReset={() => this.onImageReset('businessCategoryImage')}
            onMainPhotoSelect={this.onMainPhotoSelect}
            multiple={false}
            helperText='Select image to be shown as category background'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ImageUploader
            images={businessCategoryIcon}
            onFileChange={(images) => this.onFileChange(images, 'businessCategoryIcon')}
            onReset={() => this.onImageReset('businessCategoryIcon')}
            onMainPhotoSelect={this.onMainPhotoSelect}
            multiple={false}
            helperText='Select image to be shown as category icon'
          />
        </Grid>

        <Grid item xs={12}>
          <FormButtons
            saveFunction={this.saveCategory}
            cancelLink={'/admin/business-categories'}
          />
        </Grid>

      </Grid>
    )
  }
}

BusinessCategoryForm.propTypes = {
  category: PropTypes.object,
  match: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  getAllBusinessCategories: PropTypes.func.isRequired,
  saveCategory: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state, props) => {
  const category = state.businessCategory.allBusinessCategories.find(category => category.id === parseInt(props.match.params.categoryId))

  return {
    categories: state.businessCategory.allBusinessCategories,
    category: category,
    isLoading: state.businessCategory.isBusinessCategoryFormDataLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBusinessCategories: () => dispatch(businessCategoryOperations.getAllBusinessCategories()),
    saveCategory: (category, image, icon) => dispatch(businessCategoryOperations.saveCategory(category, image, icon))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessCategoryForm)
