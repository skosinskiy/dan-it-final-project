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

class MainPage extends React.Component {
  render () {
    const {currentPlace} = this.props
    return (
      <div className="main-page">
        <div className="grid-wrapper">
          {
            hasLayuot(currentPlace, LayoutItems.EVENTS) &&
            <aside className="left-sidebar"><ScreenEventList screenId={+this.props.match.params.screenId}/></aside>
          }
          <main className="main-section">
            <div className={'video-container'}>
              {
                hasLayuot(currentPlace, LayoutItems.VIDEO) &&
                <MainVideo/>
              }
            </div>
            <Footer />
          </main>
          {
            hasLayuot(currentPlace, LayoutItems.NEWS) &&
            <aside className="right-sidebar"><ScreenNewsList/></aside>
          }
        </div>
        <QRCode place={currentPlace} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPlace: state.currentPlace.currentPlace
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
