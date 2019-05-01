import React, {Component} from 'react'
import BusinessItem from './BusinessItem'
import {getAllBusinessesByCategory} from '../../store/businesses/operations'
import { connect } from 'react-redux'
import './businessList.scss'

class BusinessList extends Component {
  componentDidMount () {
    const {getBusinessesByCategory} = this.props
    getBusinessesByCategory(+this.props.match.params.id)
  }

  render () {
    const {businessesByCategory} = this.props
    console.log(businessesByCategory)
    const businessList = businessesByCategory.map((business) => {
      return <BusinessItem key={business.id} business={business}/>
    })
    return (
      <div className="businesse-container">
        <h1 className="businesses-title">Services</h1>
        <div className="businesses-list">
          {businessList}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    businessesByCategory: state.businesses.businessesByCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessesByCategory: (categoryId) => dispatch(getAllBusinessesByCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessList)