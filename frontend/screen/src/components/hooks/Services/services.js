import React, { Component } from 'react'
import BusinessItem from '../../BusinessList/BusinessItem'
import { connect } from 'react-redux'
import * as businessOperations from '../../../store/businesses/operations'
import './services.scss'
import InfiniteScroll from '../../InfiniteScroll'

class Services extends Component {
  componentDidMount () {
    const {getBusinessByAmount} = this.props
    getBusinessByAmount(5)
  }

  loadItems = () => {
    return this.props.businessList.map((business) => {
      return <BusinessItem key={business.id} business={business}/>
    })
  };
  
  render () {
    const {isLoading} = this.props
    
    const businessList = this.loadItems()
    return (
      <>
        <h1>Services</h1>
        <InfiniteScroll
          scrollTo={0.9}
          totalItems={this.props.totalItems}
          currentItems={businessList.length}
          fetchMore={this.props.getBusinessByAmount}
          hasMore={true}
          isLoading={isLoading}
        >
          {businessList}
        </InfiniteScroll>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    businessList: state.businesses.businessList,
    totalItems: state.businesses.totalItems,
    currentItems: state.businesses.currentItems,
    isLoading: state.businesses.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessByAmount: (amount) => dispatch(businessOperations.getBusinessByAmount(amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)