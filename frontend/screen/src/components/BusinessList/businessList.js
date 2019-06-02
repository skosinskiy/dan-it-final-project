import React, {Component} from 'react'
import BusinessItem from './BusinessItem'
import {getAllBusinessesByCategory, getBusinessCategoryById} from '../../store/businesses/operations'
import { connect } from 'react-redux'
import './businessList.scss'
import Preloader from '../Preloader'

class BusinessList extends Component {
  componentDidMount () {
    const {getBusinessesByCategory, getBusinessCategoryById} = this.props
    getBusinessesByCategory(+this.props.match.params.id)
    getBusinessCategoryById(+this.props.match.params.id)
  }

  render () {
    const {businessesByCategory, categoryIsLoading, currentCategory} = this.props
    if (categoryIsLoading) {
      return <Preloader/>
    }
    const businessList = businessesByCategory.map((business) => {
      return <BusinessItem key={business.id} business={business}/>
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
    categoryIsLoading: state.businesses.categoryIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessesByCategory: (categoryId) => dispatch(getAllBusinessesByCategory(categoryId)),
    getBusinessCategoryById: (categoryId) => dispatch(getBusinessCategoryById(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList)