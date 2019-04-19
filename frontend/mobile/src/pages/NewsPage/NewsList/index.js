import React from 'react'
import NewsItem from './NewsItem'
import './index.scss'

const NewsList = ({news}) => {
  return (
    <ul className='NewsItems'>
      {news.map((item, index) => <NewsItem key={`NewsItem${index}`} info={item} />)}
    </ul>
  )
}
export default NewsList
