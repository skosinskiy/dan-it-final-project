import React, { Fragment } from 'react'
import NewsItem from './NewsItem'
import './news-list.scss'

const NewsList = ({news}) => {
  return (
    <Fragment>
      <ul className='NewsItems'>
        {news.map((item, index) => <NewsItem key={`NewsItem${index}`} info={item} />)}
      </ul>
    </Fragment>
  )
}
export default NewsList
