import React, { Component } from 'react'
import BusinessItem from '../../BusinessList/BusinessItem'
import '../../../styles/hooks.scss'
import { connect } from 'react-redux'
import * as businessOperations from '../../../store/businesses/operations'


class Services extends Component {
  componentDidMount () {
    const {getBusinessByAmount} = this.props
    getBusinessByAmount(3)
  }
  
  handleScroll =  () => {
    const clientHeignt = this.refs.myscroll.clientHeight
    const scrollTop = parseInt(this.refs.myscroll.scrollTop)
    const scrollHeight = this.refs.myscroll.scrollHeight
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
    const {loading, totalItems, currentItems, getBusinessByAmount} = this.props
    if (loading || currentItems >= totalItems) {
      return
    }
    getBusinessByAmount(currentItems + 1);
  }
  
  render () {
    const businessList = this.loadItems();
    return (
      <>
        <h1>Services</h1>
        <div
          ref='myscroll'
          onScroll={this.handleScroll}
          className="businesses-list">
          {businessList}
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
    getBusinessByAmount: (amount) => dispatch(businessOperations.getBusinessByAmount(amount)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)