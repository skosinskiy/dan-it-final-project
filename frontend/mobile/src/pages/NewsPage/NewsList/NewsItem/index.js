import React from 'react'
import {ReactComponent as NewsItemPhoto1} from '../../../../img/NewsPage/news-menu-item1.svg'
import './index.scss'

const NewsItem = (props) => {
  const {info: {link, title, contentSnippet}} = props
  const shorten = (contentSnippet, maxLength = 200) => {
    if (contentSnippet.length < maxLength) {
      return contentSnippet
    }
    return `${contentSnippet.slice(0, maxLength - 3)}...`
  }
  return (
    <div className={'news-item'}>
      <div className={'news-item__top'}>
        <div className={'news-item__top-photo'}>
          <NewsItemPhoto1 /><a href=' ' className='news-item__folder-btn' > </a>
        </div>
        <div className={'news-item__top-text'}>
          <a href={link} className={'news-item__top-text-title'}>{(title)}</a>
          <a href=' ' className='news-item__save-btn' > </a>
          <a href={link} className={'news-item__top-text-description'}>{shorten(contentSnippet)}</a>
        </div>
      </div>
      <div className={'news-item__bottom'}>
        <input className='news-item__bottom-input' type='text' placeholder='Comment' />
        <button className='news-item__bottom-btn' />
      </div>
    </div>
  )
}

export default NewsItem
