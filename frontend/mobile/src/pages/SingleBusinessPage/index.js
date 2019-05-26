import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import './SingleBusinessesPage.scss'
import {getBusinessById} from '../../store/businesses/operations'
import Preloader from '../../components/Preloader'

class SingleBusinessPage extends Component {
  componentDidMount () {
    const {getBusinessById} = this.props
    getBusinessById(+this.props.match.params.businessId)
  }
  render () {
    const {businessItem, businessIsLoading, currentPlaceById} = this.props
    if (businessIsLoading) {
      return <Preloader/>
    }
    const link = currentPlaceById.id ? `/mobile/my-places/${currentPlaceById.id}` : '/mobile/home'
    const img = businessItem.mainPhoto.imageUrl
    console.log(img)

    return (
      <div className="bp-wrapper">
        <NavLink to={link} className="bp_back-btn">
          Back
        </NavLink>
        <h2 className="bp__title">{businessItem.title}</h2>
        <div className="bp-info">
          <div style={{backgroundImage: `url(${img})`}} className="bp-info__photo"/>
          <div className="bp-info_text">
            <p className="bp-info_text__address">{businessItem.address}</p>
            <div className="bp-info_text__phone">{businessItem.phoneNumber}</div>
            <a href={businessItem.webSite} className="bp-info_text__site">{businessItem.webSite}</a>
            <div className="bp-info__categories">
              {[...businessItem.categories.map(item => <p key={Math.random()} className="bp-categories-info__text">{item.name}</p>)]}
            </div>
          </div>
        </div>
        <div className="bp_description">{businessItem.description}</div>
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

const mapStateToProps = (state) => {
  return {
    businessItem: state.businesses.currentBusiness,
    businessIsLoading: state.businesses.businessIsLoading,
    currentPlaceById: state.places.currentPlaceById
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessById: (id) => dispatch(getBusinessById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBusinessPage)