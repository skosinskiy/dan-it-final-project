/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import React, {Component} from 'react'
import Parser from 'rss-parser'
import ScreenEventItem from './ScreenNewsItem/'
import './ScreenNewsList.scss'

export default class ScreenNewsList extends Component {
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
        console.log(item)
        this.setState({rss: [...this.state.rss, item]})
      })
    }
    getNews()
  }

  componentDidMount () {
    this.handleRSS('https://www.techradar.com/rss/news/world-of-tech')
  }

  renderItems (arr) {
    return arr.map((item) => {
      const {id, title, link, enclosure} = item
      return (
        <ScreenEventItem
          key={id}
          description = {title}
          link = {link}
          img = { enclosure.url }
        />
      )
    })
  }

  render () {
    const items = this.renderItems(this.state.rss)
    return (
      <section className={'screenNewsList'}>
        {items}
      </section>
    )
  }
}
