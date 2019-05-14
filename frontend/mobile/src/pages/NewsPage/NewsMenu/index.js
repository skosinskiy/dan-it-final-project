import React from 'react'
import './news-menu.scss'

const NewsMenu = (props) => {
  const euroMaidan = 'euromaidanpress.com/feed'
  const bbcTech = 'http://feeds.bbci.co.uk/news/technology/rss.xml'
  const bbcBusiness = 'http://feeds.bbci.co.uk/news/business/rss.xml'
  const bbcWorld = 'http://feeds.bbci.co.uk/news/world/rss.xml'
  const { handleRSS } = props

  return (
    <div className="news-menu">
      <button type="button" className="news-menu__button" onClick={handleRSS(bbcWorld)}>BBC World</button>
      <button type="button" className="news-menu__button" onClick={handleRSS(bbcTech)}>Tech</button>
      <button type="button" className="news-menu__button" onClick={handleRSS(bbcBusiness)}>Business</button>
      <button type="button" className="news-menu__button" onClick={handleRSS(euroMaidan)}>Euromaidan</button>
    </div>
  )
}

export default NewsMenu
