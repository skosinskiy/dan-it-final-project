import React from 'react'
import './index.scss'

function parseImageUrl (str) {
  const substring = str.slice(str.indexOf('<img'))
  const urlSubstring = substring.slice(substring.indexOf(`src="`) + 5)
  const endIndex = urlSubstring.indexOf(`"`)
  return urlSubstring.slice(0, endIndex)
}

const NewsItem = (props) => {
  const {link, title, contentSnippet, content} = props.info
  const shorten = (contentSnippet, maxLength = 300) => {
    if (contentSnippet.length < maxLength) {
      return contentSnippet
    }
    return `${contentSnippet.slice(0, maxLength - 3)}...`
  }

  return (
    <div className='news-item'>
      <div className='news-item__top'>
        <img className='news-item__news-image' src={parseImageUrl(content)} alt=' ' />
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
