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

  handleRSS = (rssSource) => {
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'
    const parser = new Parser()
    const getNews = async () => {
      let feed = await parser.parseURL(CORS_PROXY + rssSource)
      this.setState({rss: []})

      feed.items.forEach(item => {
        this.setState({rss: [...this.state.rss, item]})
      })
    }
    getNews()
  }

  componentDidMount () {
    this.handleRSS('euromaidanpress.com/feed')
  }

  render () {
    return (
      <div className="newsPage parallax-container">
        <MobileHeader bgImage={headerImage} header={'All news'} location='Kyiv' />
        <NewsMenu handleRSS={this.handleRSS} />
        <div className='newsPage__content'>
          <NewsList news={this.state.rss} />
        </div>
      </div>
    )
  }
}

export default NewsPage