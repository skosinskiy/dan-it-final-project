import React from 'react'
import ScreenEventList from "../../components/ScreenEventList/ScreenEventList";
import MainVideo from '../../components/MainVideo/MainVideo'
import './MainPage.scss'

const MainPage = () => {
  return (
      <div className={'mainPage'}>
        <div className={'mainPage-screenEventList'}>
          <ScreenEventList />
        </div>
        <div className={'mainPage-MainVideo'}>
          <MainVideo />
        </div>
      </div>

  )
}

export default MainPage
