import React, {Component} from 'react'
import BusinessItem from './BusinessItem'
import {getAllBusinessesByCategory, getBusinessCategoryById} from '../../store/businesses/operations'
import { connect } from 'react-redux'
import './businessList.scss'
import Preloader from '../Preloader'

class BusinessList extends Component {
  componentDidMount () {
    const {getBusinessesByCategory, getBusinessCategoryById} = this.props
    const {screenId, id} = this.props.match.params
    getBusinessesByCategory(id, screenId)
    getBusinessCategoryById(id)
  }

  render () {
    const {businessesByCategory, categoryIsLoading, currentCategory, businessesByCategoryIsLoadig} = this.props
    const screenId = +this.props.match.params.screenId
    if (categoryIsLoading || businessesByCategoryIsLoadig) {
      return <Preloader/>
    }
    const businessList = businessesByCategory.map((business) => {
      return <BusinessItem key={business.id} business={business} screenId={screenId}/>
    })
    return (
      <div className="businesse-container">
        <h1 className="businesses-title">{currentCategory.name}</h1>
        <div className="businesses-list">
          {businessList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    businessesByCategory: state.businesses.businessesByCategory,
    currentCategory: state.businesses.currentCategory,
    categoryIsLoading: state.businesses.categoryIsLoading,
    businessesByCategoryIsLoadig: state.businesses.businessesByCategoryIsLoadig
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessesByCategory: (categoryId, placeId) => dispatch(getAllBusinessesByCategory(categoryId, placeId)),
    getBusinessCategoryById: (categoryId) => dispatch(getBusinessCategoryById(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList)