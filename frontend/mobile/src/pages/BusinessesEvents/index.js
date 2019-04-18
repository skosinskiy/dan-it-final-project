import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ReactComponent as Shops} from '../../img/icons/shops.svg'
import {ReactComponent as Food} from '../../img/icons/food.svg'
import {ReactComponent as Fun} from '../../img/icons/fun.svg'
import {ReactComponent as Services} from '../../img/icons/services.svg'
import {ReactComponent as Useful} from '../../img/icons/useful.svg'
import {ReactComponent as Bee} from '../../img/icons/bee.svg'
import SectionItem from './SectionItem'
import './businesses-events.scss'
import {getAllBusinessesByPlace} from '../../actions/businesses'

const items = [
  {
    id: 1,
    title: 'Cupcake',
    address: 'Lva Tolstogo str, 56',
    photo: 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  },
  {
    id: 2,
    title: 'Cupcake',
    address: 'Lva Tolstogo str, 56',
    photo: 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  },
  {
    id: 3,
    title: 'Cupcake',
    address: 'Lva Tolstogo str, 56',
    photo: 'https://images.unsplash.com/photo-1519869325930-281384150729?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
  }
]

class BusinessesEvents extends Component {
  state = {
    businesses: []
  }

  componentDidMount () {
    const {getBusinessesByPlace} = this.props
    getBusinessesByPlace(1)
    this.getBusinenessesByCategory(1)
  }

  getBusinenessesByCategory = (id) => {
    const {allBusinesses} = this.props
    const businessesByCategory = allBusinesses.filter(business => {
      return business.categoty.id === id
    })
    this.setState({businesses: [...businessesByCategory]})
  }

  render () {
    const {allBusinesses} = this.props
    const businessesList = items.map(item => {
      return <SectionItem key={item.id} item={item}/>
    })

    const eventsList = items.map(item => {
      return <SectionItem key={item.id} item={item}/>
    })

    return (
      <div className="container">
        <div className="header">
          <div className="header-icon">
            <h2 className="header-title">Malls</h2>
            <h3 className="header-description">Sky Mall</h3>
          </div>
        </div>
        <div className="content">
          <div className="navbar">
            <h2 className="section-title">Explore</h2>
            <ul className="menu">
              <li className="menu-item" onClick={() => this.getBusinenessesByCategory(1)}>
                <div className="menu-item_icon"><Shops/></div>
                <div className="menu-item_text">Shops</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"><Food/></div>
                <div className="menu-item_text">Food</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"><Fun/></div>
                <div className="menu-item_text">Fun</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"><Services/></div>
                <div className="menu-item_text">Services</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"><Useful/></div>
                <div className="menu-item_text">Useful</div>
              </li>
            </ul>
          </div>
          <div className="businesses section">
            <div className="section-header">
              <h2 className="section-title">Popular near home</h2>
              <h4 className="side-title">See all</h4>
            </div>
            <div className="section-list">
              {businessesList}
            </div>
          </div>
          <div className="events section">
            <div className="section-header">
              <h2 className="section-title">Events</h2>
              <div className="side-icon"><Bee/></div>
            </div>
            <div className="section-list">
              {eventsList}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allBusinesses: [...state.businesses.businessesByPlace]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessesByPlace: (placeId) => dispatch(getAllBusinessesByPlace(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessesEvents)