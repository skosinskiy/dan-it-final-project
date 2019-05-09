import React from 'react'
import './index.scss'

function parseImageUrl (str) {
  let imgIndex = str.indexOf('<img')
  let substring = str.slice(imgIndex)
  let startIndex = substring.indexOf(`src="`)
  let urlSubstring = substring.slice(startIndex + 5)
  let endIndex = urlSubstring.indexOf(`"`)
  return urlSubstring.slice(0, endIndex)
}

const NewsItem = (props) => {
  const {info: {link, title, contentSnippet, content}} = props
  const shorten = (contentSnippet, maxLength = 160) => {
    if (contentSnippet.length < maxLength) {
      return contentSnippet
    }
    return `${contentSnippet.slice(0, maxLength - 3)}...`
  }

  return (
    <div className='news-item'>
      <div className='news-item__top'>
        <div className='news-item__top-photo'>
          <img src={parseImageUrl(content)} align="middle" width="165" height="223" alt=" "/>
        </div>
        <div className={'news-item__top-text'}>
          <a href={link} className={'news-item__top-text-title'}>{(title)}</a>
          <a href=' ' className='news-item__save-btn' > </a>
          <p className={'news-item__top-text-description'}>{shorten(contentSnippet)}</p>
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
