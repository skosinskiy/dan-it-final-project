import React, {Component} from 'react'
import {connect} from 'react-redux'
import './SingleBusinessesPage.scss'
import {getBusinessById} from '../../store/businesses/operations'
import Preloader from '../../components/Preloader'
import MobileHeader from '../../components/MobileHeader'
import SectionItem from '../BusinessesEvents/SectionItem'

class SingleBusinessPage extends Component {
  componentDidMount () {
    const {getBusinessById} = this.props
    getBusinessById(+this.props.match.params.businessId)
  }
  render () {
    const {businessItem, businessIsLoading} = this.props
    if (businessIsLoading) {
      return <Preloader/>
    }

    const eventsList = businessItem.events.length > 0
      ? businessItem.events.map(item => <SectionItem key={item.id} item={item} type={'events'}/>)
      : <div className="section-item__address">{'There is no events yet'}</div>

    const photos = businessItem.photos
      ? businessItem.photos.filter(photo => photo.id !== businessItem.mainPhoto.id)
      : []
    if (businessItem.photos) {
      photos.unshift(businessItem.photos.find(photo => photo.id === businessItem.mainPhoto.id))
    }

    return (
      <div className="parallax-container">
        <MobileHeader photos={photos} backLink={'/mobile/home'}/>
        <div className={'business-container'}>
          <h2 className="bp-title">{businessItem.title}</h2>
          <div className="bp-info__categories">
            <p className="bp-categories-info__text">{businessItem.categories.map(cat => cat.name).join(',')}</p>
          </div>
          <div className="bp_description">{businessItem.description}</div>
          <div className="bp-info">
            <div className="bp-info_text">
              <h2 className='bp-subtitle'>Address</h2>
              <p className="bp-categories-info__text">{businessItem.place.title}</p>
              <p className="bp-info_text__address">{businessItem.address}</p>
            </div>
          </div>
          <div className="bp-info">
            <div className="bp-info_text">
              <h2 className='bp-subtitle'>Contacts</h2>
              <p className="bp-info_text__phone">
                {`Phone: ${businessItem.phoneNumber}`}
              </p>
              <a href={`//${businessItem.webSite}`} className="bp-info_text__site">
                {businessItem.webSite}
              </a>
            </div>
          </div>
          <div className="bp-info">
            <div className="bp-info_text">
              <h2 className='bp-subtitle__events'>Events</h2>
              <div className="section-list">
                {eventsList}
              </div>
            </div>
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