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
    const {businessItem, currentCategory} = this.props
    const screenId = +this.props.match.params.screenId
    if (!businessItem) {
      return <Preloader/>
    }
    console.log(...businessItem.photos)
    const link = currentCategory.id ? `/screen/${screenId}/category/${currentCategory.id}` : `/screen/${screenId}`
    return (
      <div className="bp-wrapper">

        <div className="bp-info">
          <NavLink to={link} className="bp-info_back-btn">
            Back
          </NavLink>
          <h2 className="bp-info__title">{businessItem.title}</h2>
          <div className="bp-info_text">
            <a href={businessItem.webSite} className="bp-info_text__site">{businessItem.webSite}</a>
            <p className="bp-info_text__address">{businessItem.address}</p>
            <span className="bp-info_text__phone">{businessItem.phoneNumber}</span>
            <p className="bp-info_text__description">{businessItem.description}</p>
            <div className="bp-info__categories">
              {[...businessItem.categories.map(item => <p key={Math.random()} className="bp-categories-info__text">{item.name}</p>)]}
            </div>
            <div className="bp-info_photot"></div>
            <div className="bp-places">
              <p className="bp-places__item">{businessItem.place.title}</p>
            </div>
          </div>
        </div>
        <div className="bp-place-photo-wrapper">
          <div className="bp-photos">
            {[...businessItem.photos.map(item => <div key={Math.random()} className="bp-photo__item" style={{backgroundImage: `url(${item.imageUrl})`}}></div>)]}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    businessItem: state.businesses.businessItem,
    currentCategory: state.businesses.currentCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBusinessById: (id) => dispatch(businessOperations.getBusinessById(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBusinessPage)