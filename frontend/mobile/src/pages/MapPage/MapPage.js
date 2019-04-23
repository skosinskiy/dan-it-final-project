import React from 'react'
import './MapPage.scss'
import MobileHeader from '../../components/MobileHeader'
import Iframe from 'react-iframe'
import headerImage from "../../img/NewsPage/news-menu-bg.svg";
import NewsList from "../NewsPage";
import DialogueList from "../DialoguesPage";

const Map = (props) => {
  return (
{/*      <div className='dialogue-page'>
        <div className='dialogue-page__header'>
          <div className='dialogue-page__title'>Messages</div>
          <a href=' ' className='dialogue-page__header-menu' > </a>
        </div>
        <DialogueList dialogues={this.state.dialogues} />
        <BlueButton />
      </div>*/}
      <div className="newsPage parallax-container">
        <MobileHeader />
        <div className='newsPage__content'>
          <Iframe
              url={'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.6655269994703!2d30.59119171589868!3d50.42870309681247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c57dd85632a3%3A0x60a23243bc1fbf89!2z0KLQpiDQodC40LvRjNCy0LXRgCDQkdGA0LjQtw!5e0!3m2!1sru!2sua!4v1555755290223!5m2!1sru!2sua'}
              className = "iframe"
          />
        </div>
      </div>
  )
}

export default Map