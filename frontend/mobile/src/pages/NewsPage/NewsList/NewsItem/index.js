import React from 'react'
import './index.scss'

function parseImageUrl (str) {
  const substring = str.slice(str.indexOf('<img'))
  const urlSubstring = substring.slice(substring.indexOf(`src="`) + 5)
  const endIndex = urlSubstring.indexOf(`"`)
  const result = urlSubstring.slice(0, endIndex)
  return result === '' ? null : result
}

const NewsItem = (props) => {
  const {link, title, contentSnippet, content} = props.info
  const shorten = (contentSnippet, maxLength = 300) => {
    if (contentSnippet.length < maxLength) {
      return contentSnippet
    }
    return `${contentSnippet.slice(0, maxLength - 3)}...`
  }
  const imageURL = parseImageUrl(content)

  return (
    <div className='news-item'>
      <div className='news-item__top'>
        <div className='news-item__img-container'>
          {imageURL
            ? <img className='news-item__news-image' src={imageURL} alt=' ' />
            : null
          }
        </div>
        <div className='news-item__top-text'>
          <a href={link} className='news-item__top-text-title'>{(title)}</a>
          <a href=' ' className='news-item__save-btn' > </a>
          <p className='news-item__top-text-description'>{shorten(contentSnippet)}</p>
        </div>
      </div>
      <div className='news-item__bottom'>
        <input className='news-item__bottom-input' type='text' placeholder='Comment' />
        <button className='news-item__bottom-btn' />
      </div>
    </div>
  )
}

export default NewsItem
