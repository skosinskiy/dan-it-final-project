import React from 'react'
import './news-menu.scss'

const NewsMenu = (props) => {
  return (
    <div className="news-menu">
      <div className="news-menu__button"><a href=' ' className="news-menu__button--link">Clothes</a></div>
      <div className="news-menu__button"><a href=' ' className="news-menu__button--link">Market</a></div>
      <div className="news-menu__button"><a href=' ' className="news-menu__button--link">Shops</a></div>
      <div className="news-menu__button"><a href=' ' className="news-menu__button--link">Shoes</a></div>
    </div>
  )
}

export default NewsMenu
