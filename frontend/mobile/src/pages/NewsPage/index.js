/* eslint-disable indent */
import React, {Component} from 'react'
import {ReactComponent as Camera} from '../../img/NewsPage/camera.svg'
import NewsList from './NewsList'
import './index.scss'

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
      }
    ]
  }
  render () {
    return (
      <div className="newsPage">
        <div className="container">
            <div className="newsPage__header">
                <div className="newsPage__header__items">
                <Camera />
                <a href=' ' className="newsPage__header__items__menu"> </a>
                </div>
                <div className="newsPage__header__text">
                <p className="newsPage__header__text__link">All news</p>
                </div>
            </div>
            <div className="newsPage__menu">
              <div className="newsPage__menu__buttons">
                <div className="newsPage__menu__button"><a href=' ' className="newsPage__menu__button__link">Clothes</a></div>
                <div className="newsPage__menu__button"><a href=' ' className="newsPage__menu__button__link">Market</a></div>
                <div className="newsPage__menu__button"><a href=' ' className="newsPage__menu__button__link">Shops</a></div>
                <div className="newsPage__menu__button"><a href=' ' className="newsPage__menu__button__link">Shoes</a></div>
              </div>
            </div>
            <NewsList news={this.state.news} />
        </div>
      </div>
        
    )
  }
}
  
export default NewsPage