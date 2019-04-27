import React, { Fragment } from 'react'
import NewsItem from './NewsItem'
import './news-list.scss'

const NewsList = ({news}) => {
  return (
    <Fragment>
      <div className="news-menu">
        <div className="news-menu__button"><a href=' ' className="news-menu__button--link">Clothes</a></div>
        <div className="news-menu__button"><a href=' ' className="news-menu__button--link">Market</a></div>
        <div className="news-menu__button"><a href=' ' className="news-menu__button--link">Shops</a></div>
        <div className="news-menu__button"><a href=' ' className="news-menu__button--link">Shoes</a></div>
      </div>
      <ul className='NewsItems'>
        {news.map((item, index) => <NewsItem key={`NewsItem${index}`} info={item} />)}
      </ul>
    </Fragment>
  )
}
export default NewsList
