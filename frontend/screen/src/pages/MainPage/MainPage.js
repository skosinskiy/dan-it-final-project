import React from 'react'
import MainVideo from '../../components/MainVideo/MainVideo'
import {connect} from 'react-redux'
import {hasLayuot} from '../../utils/hasLayout'
import LayoutItems from '../../constants/layoutItems'
import './MainPage.scss'
import Footer from '../../components/Footer/Footer'
import ScreenEventList from '../../components/ScreenEventList/ScreenEventList'
import ScreenNewsList from '../../components/ScreenNewsList'
import QRCode from '../../components/QRCode/QRCode'
import {businessOperations} from '../../store/businesses'

class MainPage extends React.Component {
  state = {
    messages: []
  }

  componentDidMount () {
    this.props.getPlaceMessagesByPlaceId(this.props.currentPlace.id).then(() => {
      this.setState({
        ...this.state, messages: this.props.placeMessages
      })
    })
  }

  render () {
    const {currentPlace} = this.props

    let mainSectionClassWidth = 'main-section__width60'
    let mainSectionClassHight = 'main-section__height100'

    if (!hasLayuot(currentPlace, LayoutItems.EVENTS) || !hasLayuot(currentPlace, LayoutItems.NEWS)) {
      mainSectionClassWidth = 'main-section__width80'
    }

    if (hasLayuot(currentPlace, LayoutItems.MESSAGES)) {
      mainSectionClassHight = 'main-section__height80'
    }

    return (
      <div className='main-page'>
        <div className="grid-wrapper">
          {
            hasLayuot(currentPlace, LayoutItems.EVENTS) &&
            <aside className={'left-sidebar'}><ScreenEventList screenId={+this.props.match.params.screenId}/></aside>
          }
          <main className={mainSectionClassWidth}>
            <div className={'video-container ' + mainSectionClassHight}>
              {
                hasLayuot(currentPlace, LayoutItems.VIDEO) &&
                <MainVideo currentPlase = {currentPlace}/>
              }
            </div>
            <Footer messages={this.state.messages} />
          </main>
          {
            hasLayuot(currentPlace, LayoutItems.NEWS) &&
            <aside className={'right-sidebar'}><ScreenNewsList/></aside>
          }
        </div>
        <QRCode place={currentPlace} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPlace: state.currentPlace.currentPlace,
    placeMessages: state.businesses.placeMessages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaceMessagesByPlaceId: placeId => dispatch(businessOperations.getPlaceMessagesByPlaceId(placeId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
