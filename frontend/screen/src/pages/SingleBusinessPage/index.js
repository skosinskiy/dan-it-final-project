import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import * as businessOperations from '../../store/businesses/operations'
import './SingleBusinessesPage.scss'
import Preloader from '../../components/Preloader'

class SingleBusinessPage extends Component {
  componentDidMount () {
    const {getBusinessById} = this.props
    getBusinessById(this.props.match.params.id)
  }
  render () {
    const {businessItem} = this.props
    if (!businessItem) {
      return <Preloader/>
    }
    
    return (
      <div className="bp-wrapper">
        <NavLink to="/businesses/" className="bp_back-btn">
          Back
        </NavLink>
        <h2 className="bp__title">{businessItem.title}</h2>
        <div className="bp-info">
          <img src={businessItem.mainPhoto} alt="business logo" className="bp-info__photo"/>
          <div className="bp-info_text">
            <p className="bp-info_text__address">{businessItem.address}</p>
            <p className="bp-info_text__description">{businessItem.description}</p>
            <span className="bp-info_text__phone">{businessItem.phoneNumber}</span>
            <a href={businessItem.webSite} className="bp-info_text__site">{businessItem.webSite}</a>
            <div className="bp-info__categories">
              {[...businessItem.categories.map(item => <p key={Math.random()} className="bp-categories-info__text">{item.name}</p>)]}
            </div>
          </div>
        </div>
        <div className="bp-place-photo-wrapper">
          <div className="bp-places">
            <p className="bp-places__item">{businessItem.place.title}</p>
          </div>
          <div className="bp-photos">
            {[...businessItem.photos.map(item => <p key={Math.random()} className="bp-photo__item">{item.photo}</p>)]}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    businessItem: state.businesses.businessItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessById: (id) => dispatch(businessOperations.getBusinessById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBusinessPage)