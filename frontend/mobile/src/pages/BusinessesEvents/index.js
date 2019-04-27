import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ReactComponent as Shops} from '../../img/icons/shops.svg'
import {ReactComponent as Food} from '../../img/icons/food.svg'
import {ReactComponent as Fun} from '../../img/icons/fun.svg'
import {ReactComponent as Services} from '../../img/icons/services.svg'
import {ReactComponent as Useful} from '../../img/icons/useful.svg'
import {ReactComponent as Bee} from '../../img/icons/bee.svg'
import SectionItem from './SectionItem'
import MobileHeader from '../../components/MobileHeader'
import bag from '../../img/icons/bag.svg'
import './businesses-events.scss'
import {getBusinessesByCategory} from '../../actions/businesses'
import {getEventsByPLace} from '../../actions/events'

class BusinessesEvents extends Component {
  componentDidMount () {
    const {getBusinessesByCategory, getEventsByPLace} = this.props
    getBusinessesByCategory(1)
    getEventsByPLace(1)
  }

  getBusinenessesByCategory (id) {
    const {getBusinessesByCategory} = this.props
    getBusinessesByCategory(id)
  }

  render () {
    const {businesses, events} = this.props
    const businessesList = businesses.map(item => {
      return <SectionItem key={item.id} item={item}/>
    })
    const eventsList = events.map(item => {
      return <SectionItem key={item.id} item={item}/>
    })
    const bgImageURL = 'https://i.lb.ua/121/60/5b1501c46a520.jpeg'

    return (
      <div className="businesse-container parallax-container">
        <MobileHeader header="Malls" location="Sky Mall" bgImage={bgImageURL} icon={bag} />
        <div className="content">
          <div className="navbar">
            <h2 className="section-title">Explore</h2>
            <ul className="menu">
              <li className="menu-item" onClick={() => this.getBusinenessesByCategory(1)}>
                <div className="menu-item_icon"><Shops/></div>
                <div className="menu-item_text">Shops</div>
              </li>
              <li className="menu-item" onClick={() => this.getBusinenessesByCategory(2)}>
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
    businesses: state.businesses.businessesByCategory,
    events: state.events.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessesByCategory: (categoryId) => dispatch(getBusinessesByCategory(categoryId)),
    getEventsByPLace: (placeId) => dispatch(getEventsByPLace(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessesEvents)