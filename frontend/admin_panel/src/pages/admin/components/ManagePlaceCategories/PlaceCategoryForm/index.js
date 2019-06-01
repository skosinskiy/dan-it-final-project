import Checkbox from '@material-ui/core/Checkbox'
import Preloader from 'components/Preloader'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {placeCategoriesOperations} from 'store/placeCategory'
import Grid from '@material-ui/core/Grid'
import FormButtons from 'components/FormButtons'
import {Redirect} from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'

const emptyPlaceCategory = {
  allowMessages: false,
  businessCategories: [],
  description: '',
  layoutItems: [],
  multisync: false,
  name: '',
  shouldAddPairedUsers: false
}

class PlaceCategoryForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editedPlaceCategory: props.placeCategory !== undefined ? props.placeCategory : emptyPlaceCategory,
      isDataSubmitted: false
    }
  }

  componentDidMount() {
    this.props.fetchPlaceCategoriesFormData()
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.placeCategory && nextProps.placeCategory !== this.props.placeCategory) {
      this.setState({
        editedPlaceCategory: nextProps.placeCategory
      })
    }
  }

  handleChange = (event, propName) => {
    const value = ['multisync', 'allowMessages', 'shouldAddPairedUsers'].includes(propName)
      ? !this.state.editedPlaceCategory[propName]
      : event.target.value

    this.setState({
      editedPlaceCategory: {
        ...this.state.editedPlaceCategory, [propName]: value
      }
    })
  }

  savePlaceCategory = () => {
    const {savePlaceCategory} = this.props
    const {editedPlaceCategory} = this.state
    savePlaceCategory(editedPlaceCategory).then(() =>
      this.setState({
        isDataSubmitted: true
      })
    )
  }

  render() {

    const {parentBusinessCategories, layoutItems, isPlaceCategoriesFormDataLoading} = this.props
    const {editedPlaceCategory, isDataSubmitted} = this.state

    const businessCategoriesValue = parentBusinessCategories.filter(category => {
      return editedPlaceCategory.businessCategories
        .some(businessCategory => category.id === businessCategory.id)
      }
    )

    if (isDataSubmitted) {
      return <Redirect to={'/admin/place-categories'}/>
    }

    if (isPlaceCategoriesFormDataLoading) {
      return <Preloader/>
    }

    const businessCategoriesOptions = parentBusinessCategories
      .map(category => (
        <MenuItem key={category.id} value={category}>
          <Checkbox checked={!!editedPlaceCategory.businessCategories.find(item => item.id === category.id)}/>
          <ListItemText primary={category.name}/>
        </MenuItem>
      ))

    const layoutItemsOptions = layoutItems
      .map((item, index) => (
        <MenuItem key={index} value={item}>
          <Checkbox checked={!!editedPlaceCategory.layoutItems.find(layoutItem => layoutItem === item)}/>
          <ListItemText primary={item}/>
        </MenuItem>
      ))

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={'Name'}
            value={editedPlaceCategory.name}
            variant='outlined'
            onChange={(event) => this.handleChange(event, 'name')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={'Description'}
            value={editedPlaceCategory.description}
            variant='outlined'
            onChange={(event) => this.handleChange(event, 'description')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>
              Business Categories
            </InputLabel>
            <Select
              multiple
              value={businessCategoriesValue}
              onChange={event => this.handleChange(event, 'businessCategories')}
              input={
                <OutlinedInput labelWidth={150}/>
              }
              renderValue={selected => selected.map(item => item.name).join(', ')}
            >
              {businessCategoriesOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>
              Layout Items
            </InputLabel>
            <Select
              multiple
              value={editedPlaceCategory.layoutItems}
              onChange={event => this.handleChange(event, 'layoutItems')}
              input={
                <OutlinedInput labelWidth={90}/>
              }
              renderValue={selected => selected.join(', ')}
            >
              {layoutItemsOptions}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editedPlaceCategory.multisync}
                onClick={event => this.handleChange(event, 'multisync')}/>
            }
            label="Is multisync?"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editedPlaceCategory.allowMessages}
                onClick={event => this.handleChange(event, 'allowMessages')}/>
            }
            label="Allow place messages?"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControlLabel
            control={
              <Checkbox checked={editedPlaceCategory.shouldAddPairedUsers}
                        onClick={event => this.handleChange(event, 'shouldAddPairedUsers')}/>
            }
            label="Add paired users contacts?"
          />
        </Grid>
        <Grid item xs={12}>
          <FormButtons
            saveFunction={() => this.savePlaceCategory(editedPlaceCategory)}
            cancelLink={'/admin/place-categories'}
          />
        </Grid>
      </Grid>
    )
  }
}

PlaceCategoryForm.propTypes = {
  fetchPlaceCategoriesFormData: PropTypes.func.isRequired,
  savePlaceCategory: PropTypes.func.isRequired,
  placeCategory: PropTypes.object,
  parentBusinessCategories: PropTypes.array.isRequired,
  layoutItems: PropTypes.array.isRequired,
  isPlaceCategoriesFormDataLoading: PropTypes.bool.isRequired
}

const mapStateToProps = (state, props) => {
  const placeCategory = state.placeCategories.placeCategories
    .find(placeCategory => placeCategory.id.toString() === props.match.params.categoryId)

  return {
    placeCategory: placeCategory,
    parentBusinessCategories: state.businessCategory.allParentBusinessCategories,
    layoutItems: state.placeCategories.layoutItems,
    isPlaceCategoriesFormDataLoading: state.placeCategories.isPlaceCategoriesFormDataLoading
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPlaceCategoriesFormData: () => dispatch(placeCategoriesOperations.fetchPlaceCategoriesFormData()),
  savePlaceCategory: placeCategory => dispatch(placeCategoriesOperations.savePlaceCategory(placeCategory))
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCategoryForm)
