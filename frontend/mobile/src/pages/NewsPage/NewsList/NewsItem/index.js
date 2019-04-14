import React from 'react'
import {ReactComponent as NewsItemPhoto1} from '../../../../img/NewsPage/news-menu-item1.svg'
import './index.scss'

const NewsItem = (props) => {
  const {info: {link, title, description}} = props
  const shortify = (description, maxlength = 100) => {
    if (description.length < maxlength) {
      return description
    }
    return `${description.slice(0, maxlength - 3)}...`
  }
  return (
    <div className={'news__item'}>
      <div className={'news__item__top'}>
        <div className={'news__item__top__photo'}><NewsItemPhoto1 /><a href='#' className="folder-btn"></a></div>
        <div className={'news__item__top__text'}>
          <a href={link} className={'news__item__top__text__title'}>{(title)}</a><a href='#' className="save-btn"></a>
          <a href={link} className={'news__item__top__text__description'}>{shortify(description)}</a>
        </div>
      </div>
      <div className={'news__item__bottom'}>
        <input className="news__item__bottom__input" type='text' placeholder='Comment'/>
        <button className="news__item__bottom__btn"></button>
      </div>
    </div>
  )
}
  
export default NewsItem