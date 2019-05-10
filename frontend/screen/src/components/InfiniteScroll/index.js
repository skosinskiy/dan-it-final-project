import React, { Component } from 'react'
import Preloader from '../Preloader'
import PropTypes from 'prop-types'
import BusinessItem from '../BusinessList/BusinessItem'

class InfiniteScroll extends Component {
  static propTypes = {
    direction: PropTypes.string,
    scrollTo: PropTypes.number,
    firstLoad: PropTypes.number,
    totalItems: PropTypes.number,
    loadMore: PropTypes.func
  }
  
  componentDidMount () {
    const {getBusinessByAmount} = this.props
    getBusinessByAmount(5)
  }
  
  handleScroll = () => {
    const clientHeignt = this.refs.myscroll.clientHeight
    const scrollTop = parseInt(this.refs.myscroll.scrollTop)
    const scrollHeight = this.refs.myscroll.scrollHeight * this.props.scrollTo
    if (scrollTop + clientHeignt >= scrollHeight) {
      this.loadMore()
    }
  }
  
  loadItems = () => {
    return this.props.businessList.map((business) => {
      return <BusinessItem key={business.id} business={business}/>
    })
  }
  
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
      <div
        ref='myscroll'
        onScroll={this.handleScroll}
      >
        {this.props.children}
        {isLoading && <Preloader/>}
      </div>
    )
  }
}

export default InfiniteScroll

InfiniteScroll.defaultProps = {
  direction: 'vertical',
  scrollTo: 0.9,
  firstLoad: 5,
}
