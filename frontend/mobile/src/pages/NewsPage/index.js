/* eslint-disable indent */
import React, {Component} from 'react'
import NewsList from './NewsList'
import MobileHeader from '../../components/MobileHeader'
import headerImage from '../../img/NewsPage/news-menu-bg.svg'
import './news-page.scss'

class NewsPage extends Component {
  state = {
    news: [
      {
        link: '#',
        image: 'https://via.placeholder.com/120x162',
        title: 'Flea market',
        description: 'Ukrainian National Cuisine. Picturesque And Quiet Place. Reserve of Table!'
      },
      {
        link: '#',
        image: 'https://via.placeholder.com/120x162',
        title: 'New place in Kiev',
        description: 'Tomorrow the office will host a flea market, everyone can take part! Bring you unnecessary things.'
      },
      {
        link: '#',
        image: 'https://via.placeholder.com/120x162',
        title: 'Flea market',
        description: 'Ukrainian National Cuisine. Picturesque And Quiet Place. Reserve of Table!'
      },
      {
        link: '#',
        image: 'https://via.placeholder.com/120x162',
        title: 'New place in Kiev',
        description: 'Tomorrow the office will host a flea market, everyone can take part! Bring you unnecessary things.'
      }
    ]
  }
  render () {
    return (
      <div className="newsPage parallax-container">
            <MobileHeader bgImage={headerImage} header={'All news'} location='Kyiv'/>
            <div className='newsPage__content'>
              <NewsList news={this.state.news} />
            </div>
      </div>
    )
  }
}

export default NewsPage