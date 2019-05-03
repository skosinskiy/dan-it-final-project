import React, { Component } from 'react'
import BusinessItem from '../../BusinessList/BusinessItem'
import { connect } from 'react-redux'
import * as businessOperations from '../../../store/businesses/operations'
import './services.scss'
import Preloader from '../../Preloader'

class Services extends Component {
  componentDidMount () {
    const {getBusinessByAmount} = this.props
    getBusinessByAmount(5)
  }
  
  handleScroll = () => {
    const clientHeignt = this.refs.myscroll.clientHeight
    const scrollTop = parseInt(this.refs.myscroll.scrollTop)
    const scrollHeight = this.refs.myscroll.scrollHeight * 0.9
    if (scrollTop + clientHeignt >= scrollHeight) {
      this.loadMore()
    }
  }
  
  loadItems = () => {
    return this.props.businessList.map((business) => {
      return <BusinessItem key={business.id} business={business}/>
    })
  };
  
  loadMore () {
    const {isLoading, totalItems, currentItems, getBusinessByAmount} = this.props
    if (isLoading || currentItems >= totalItems) {
      return
    }
    getBusinessByAmount(currentItems + 1)
  }
  
  render () {
    const {isLoading} = this.props
    
    const businessList = this.loadItems()
    return (
      <>
        <h1>Services</h1>
        <div
          ref='myscroll'
          onScroll={this.handleScroll}
          className="businesses-list">
          {businessList}
          {isLoading && <Preloader/>}
        </div>
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