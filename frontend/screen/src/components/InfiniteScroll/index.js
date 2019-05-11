import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Preloader from '../Preloader'

class InfiniteScroll extends Component {
  static propTypes = {
    direction: PropTypes.string,
    scrollTo: PropTypes.number,
    totalItems: PropTypes.number,
    currentItems: PropTypes.number,
    fetchMore: PropTypes.func,
    hasMore: PropTypes.bool,
    loader: PropTypes.element
  }
  
  handleScroll = () => {
    const clientHeignt = this.refs.myscroll.clientHeight
    const scrollTop = parseInt(this.refs.myscroll.scrollTop)
    const scrollHeight = this.refs.myscroll.scrollHeight * this.props.scrollTo
    if (scrollTop + clientHeignt >= scrollHeight) {
      this.loadMore()
    }
  }
  
  loadMore() {
    if(this.props.currentItems >= this.props.totalItems) {
      return
    }
    this.props.fetchMore(this.props.currentItems + 1)
  }
  
  render () {
    return (
      <div
        ref='myscroll'
        onScroll={this.handleScroll}
      >
        {this.props.children}
        {/*{isLoading && <Preloader/>}*/}
      </div>
    )
  }
}

export default InfiniteScroll;

InfiniteScroll.defaultProps = {
  direction: 'vertical',
  scrollTo: 0.9,
  currentItems: 4,
  totalItems: 10,
  hasMore: true,
  loader: <Preloader/>
}
