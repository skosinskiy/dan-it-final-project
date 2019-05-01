import React, { Component } from 'react'
import BusinessItem from '../../BusinessList/BusinessItem'
import '../../../styles/hooks.scss'
import { connect } from 'react-redux'
import api from '../../../helpers/FetchData'
import * as businessOperations from '../../../store/businesses/operations'


const businesses = [
  {
    id: 12323,
    title: 'Service-1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
      '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://foodcity.ru/storage/services/August2018/HHEX6ItB8AM42tyUAR5g.jpg',
    address: 'Address-1'
  },
  
  {
    id: 22323,
    title: 'Service-2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
      '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://teplyca.com.ua/wp-content/uploads/2018/04/benef-spa.jpg',
    address: 'Address-2'
  },
  
  {
    id: 32323,
    title: 'Service-3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
      '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://stirka.ua/images/otraslevie_resheniya/kommercheskaya_big.jpg',
    address: 'Address-3'
  },
  
  {
    id: 42323,
    title: 'Service-4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
      '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://stirka.ua/images/otraslevie_resheniya/kommercheskaya_big.jpg',
    address: 'Address-3'
  },
  
  {
    id: 52323,
    title: 'Service-5',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
      '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://stirka.ua/images/otraslevie_resheniya/kommercheskaya_big.jpg',
    address: 'Address-3'
  },
  
  {
    id: 62323,
    title: 'Service-6',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
      '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://stirka.ua/images/otraslevie_resheniya/kommercheskaya_big.jpg',
    address: 'Address-3'
  },
  
  {
    id: 72323,
    title: 'Service-7',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta\n' +
      '              praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.',
    photo: 'https://stirka.ua/images/otraslevie_resheniya/kommercheskaya_big.jpg',
    address: 'Address-3'
  }
]

class Services extends Component {
  componentDidMount () {
    const {getBusinessByAmount} = this.props
    getBusinessByAmount(4)
  }
  state = {
    businesses : businesses,
    currentItems : 4,
    totalItems : 12,
    loading : false
  }
  
  handleScroll =  () => {
    const clientHeignt = this.refs.myscroll.clientHeight
    const scrollTop = parseInt(this.refs.myscroll.scrollTop)
    const scrollHeight = this.refs.myscroll.scrollHeight
    if (scrollTop + clientHeignt >= scrollHeight) {
      this.loadMore()
    }
  }
  
  loadItems = (itemsNumber) => {
    const elemsCount = itemsNumber - 1;
    return this.state.businesses.filter((item, index) => index <= elemsCount).map((business) => {
      return <BusinessItem key={business.id} business={business}/>
    })
  };
  
  loadMore () {
    const {loading, businesses, currentItems, totalItems} = this.state
  
    if (loading || currentItems >= totalItems) {
      return
    }
  
    this.setState({ loading: true });
  
    api.get(`api/businesses/${currentItems + 1}`)
      .then(response => {
        this.setState({
          loading: false,
          businesses: [...businesses, response],
          currentItems: currentItems + 1,
          totalPages: response.totalPages
        })
      })
  }
  
  render () {
    // const {businessesByCategory} = this.props
    // console.log(businessesByCategory)
    const businessList = this.loadItems(this.state.currentItems);
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
    totalItems: state.businesses.totalItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessByAmount: (amount) => dispatch(businessOperations.getBusinessByAmount(amount))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)