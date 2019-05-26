import Checkbox from '@material-ui/core/Checkbox'
import Preloader from 'components/Preloader'
import PropTypes from 'prop-types'
import React from 'react'
import {connect} from 'react-redux'
import {placesCategoriesOperations} from 'store/placeCategory'
import Desciption from './components/Description'
import MultiSelect from './components/MultiSelect'
import Name from './components/Name'
import './index.scss'
import Grid from '@material-ui/core/Grid'
import FormButtons from "components/FormButtons"
import {Redirect} from 'react-router-dom'
import FormControlLabel from "@material-ui/core/FormControlLabel";

class PlaceCategoryForm extends React.Component {

  state = {isDataSubmitted: false}

  processPutOrPost() {
    this.setState({isDataSubmitted: true})
    this.props.processPutOrPost()
  }

  componentDidMount() {
    const matcher = window.location.pathname.match(/\d+$/)
    const id = matcher ? matcher[0] : null
    this.props.createOrGetPlaceCategory(id)
  }

  checkBoxTypes = {
    MULTISYNC: 'multisync',
    ALLOW_MESSAGES: 'allowMessages',
    SHOULD_ADD_PAIRED_USERS: 'shouldAddPairedUsers',
  }

  handleClickCheckBox = checkBoxType => {
    this.props.toggleCheckBox(checkBoxType)
  }

  handleClickMultisync = () => {
    this.handleClickCheckBox(this.checkBoxTypes.MULTISYNC)
  }

  handleClickAllowMessages = () => {
    this.handleClickCheckBox(this.checkBoxTypes.ALLOW_MESSAGES)
  }

  handleClickShouldAddPairedUsers = () => {
    this.handleClickCheckBox(this.checkBoxTypes.SHOULD_ADD_PAIRED_USERS)
  }

  render() {

    if (this.state.isDataSubmitted) {
      return <Redirect to={'/admin/place-categories'}/>
    }

    if (this.props.isLoading || this.props.isHttpRequestPending) {
      return <Preloader/>
    }

    const {availableBusinessCategories, availableLayoutItems} = this.props
    const {
      multisync, allowMessages, shouldAddPairedUsers, layoutItems, businessCategories: selectedBusinessCategories,
      name, key, description
    } = this.props.editedPlaceCategory
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Name name={name} placeCategoryKey={key}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <MultiSelect
            label={'Business Categories'}
            width={150}
            selectedCategories={selectedBusinessCategories}
            availableCategories={availableBusinessCategories}
            type={'businessCategories'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MultiSelect
            label={'Layout Items'}
            width={90}
            selectedCategories={layoutItems}
            availableCategories={availableLayoutItems}
            type={'layoutItems'}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Desciption
            _Key={key}
            description={description}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox checked={multisync} onClick={() => this.handleClickMultisync(key)}/>
            }
            label="Is multisync?"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox checked={allowMessages} onClick={() => this.handleClickAllowMessages(key)}/>
            }
            label="Allow place messages?"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox checked={shouldAddPairedUsers} onClick={() => this.handleClickShouldAddPairedUsers(key)}/>
            }
            label="Add paired users contacts?"
          />
        </Grid>
        <Grid item xs={12}>
          <FormButtons
            saveFunction={() => this.processPutOrPost()}
            cancelLink={'/admin/place-categories'}
          />
        </Grid>
      </Grid>
    );
  }
}

PlaceCategoryForm.propTypes = {
  editedPlaceCategory: PropTypes.object.isRequired,
  toggleCheckBox: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isHttpRequestPending: PropTypes.bool.isRequired,
  createOrGetPlaceCategory: PropTypes.func.isRequired,
  processPutOrPost: PropTypes.func.isRequired,
  availableBusinessCategories: PropTypes.array.isRequired,
  availableLayoutItems: PropTypes.array.isRequired,
}

const mapStateToProps = ({placeCategories}) => ({
  isLoading: placeCategories.isPlaceCategoryFormLoading,
  editedPlaceCategory: placeCategories.editedPlaceCategory,
  availableBusinessCategories: placeCategories.availableBusinessCategories,
  availableLayoutItems: placeCategories.availableLayoutItems,
  isHttpRequestPending: placeCategories.isHttpRequestPending,
})

const mapDispatchToProps = dispatch => ({
  toggleCheckBox: (key, checkBoxType) => dispatch(placesCategoriesOperations.toggleCheckBox(key, checkBoxType)),
  createOrGetPlaceCategory: (id) => dispatch(placesCategoriesOperations.createOrGetPlaceCategory(id)),
  processPutOrPost: () => dispatch(placesCategoriesOperations.processPutOrPost()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCategoryForm)
