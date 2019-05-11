import React, {Component} from 'react'
import Parser from 'rss-parser'
import NewsList from './NewsList'
import NewsMenu from './NewsMenu'
import MobileHeader from '../../components/MobileHeader'
import headerImage from '../../img/NewsPage/news-menu-bg.svg'
import './news-page.scss'

class NewsPage extends Component {
  state = {
    rss: []
  }

  componentDidMount () {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const parser = new Parser()
    const getNews = async () => {
      let feed = await parser.parseURL(CORS_PROXY + 'euromaidanpress.com/feed')
      console.log(feed.title)

      feed.items.forEach(item => {
        console.log(item)
        this.setState({rss: [...this.state.rss, item]})
      })
    }
    getNews()
  }

  render () {
    return (
      <div className="newsPage parallax-container">
        <MobileHeader bgImage={headerImage} header={'All news'} location='Kyiv' />
        <NewsMenu/>
        <div className='newsPage__content'>
          <NewsList news={this.state.rss} />
        </div>
      </div>
    )
  }
}

export default NewsPage