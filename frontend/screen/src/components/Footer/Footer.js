import React, {Component} from 'react'
import Messages from './Messages/'
import './Footer.scss'
import LayoutItems from '../../constants/layoutItems'
import { hasLayuot } from '../../utils/hasLayout'
import { connect } from 'react-redux'

class Footer extends Component {
  state = {
    messages: [
      {
        link: '#',
        image: '',
        text: 'Продам недорого свою кохану! Молода, всього 23 роки, безвідмовна в роботі пральна машина шукає новий будинок. Добре виглядає на кухні та у ванній, а так само привчена до туалету. Відгукується на кличку «Індезіт», при зустрічі ласкаво підморгує лампочками. Зливний шланг злегка труїть, але це виключно від надлишку почуттів. Їсть все, особливо любить шкарпетки. Телефонувати 847333333, якщо не взяв трубку – передзвоніть пізніше, у нас остання прання.'
      },
      {
        link: '#',
        image: '',
        text: 'Я продаю холодильник. Цена 20долларов. Звоните в любое время!'
      },
      {
        link: '#',
        image: '',
        text: 'Продам скейт (купив за 300 грн), після падіння передумав, Київ. Скейт-борд в дуже хорошому стані, майже не катався на ньому, після падіння. Є невеликі потертості на носі і ззаду. Якщо зацікавить - скину фото'
      }
    ]

  }
  render () {
    const {currentPlace} = this.props
    return (
      <div className='bottom-list'>
        {
          hasLayuot(currentPlace, LayoutItems.MESSAGES) &&
          <Messages messages={this.state.messages}/>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentPlace: state.currentPlace.currentPlace
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)