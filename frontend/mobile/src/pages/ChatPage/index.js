import React, { Component } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import './chat-page.scss'

const input = [
  {
    user: 4212,
    name: 'Duncan Idaho',
    content: 'Great seeing you last night, buddy',
    avatar: 'https://vignette.wikia.nocookie.net/dune/images/8/8f/300px-DuncanIdaho-RoadtoDune.jpg/revision/latest?cb=20190228051037',
    online: false
  },
  {
    user: 122,
    name: 'Jack Ahlers',
    content: 'Were two halves of the same brain! Whoa',
    avatar: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png',
    online: false
  },
  {
    user: 1322,
    name: 'Ehtel Wolfram',
    content: 'Ok',
    avatar: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png',
    online: true
  },
  {
    user: 12,
    name: 'Carol Rich',
    content: 'So what\'s going on?',
    avatar: 'http://www.creditlenders.info/wp-content/uploads/cartoon-avatar-cartoon-avatar-avatarcartoon-twitter.jpeg',
    online: true
  },
  {
    user: 12322,
    name: 'Mary Bradway',
    content: 'asdasdklajhd ;aslkhj0i [pqhoifnasd asdasdasdl awelvo82yulvo38yulow       pouirv peoar mvo iuoip urqpoiuqrwpoi umqpouqpoi uqwio a;askldb ailsdugbh ail;sdb aslkdj basdklja bsdkl bqwiu bdaso;kljdb klajjb',
    avatar: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/5.png',
    online: false
  },
  {
    user: 12322,
    name: 'Mary Bradway',
    content: 'sorry, that was my cat ',
    avatar: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/5.png',
    online: false
  },
  {
    user: 1322,
    name: 'Ehtel Wolfram',
    content: 'Ok',
    avatar: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png',
    online: true
  },
  {
    user: 12,
    name: 'Carol Rich',
    content: 'So what\'s going on?',
    avatar: 'http://www.creditlenders.info/wp-content/uploads/cartoon-avatar-cartoon-avatar-avatarcartoon-twitter.jpeg',
    online: true
  },
  {
    user: 12322,
    name: 'Mary Bradway',
    content: 'asdasdklajhd ;aslkhj0i [pqhoifnasd asdasdasdl awelvo82yulvo38yulow       pouirv peoar mvo iuoip urqpoiuqrwpoi umqpouqpoi uqwio a;askldb ailsdugbh ail;sdb aslkdj basdklja bsdkl bqwiu bdaso;kljdb klajjb',
    avatar: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/5.png',
    online: false
  },
  {
    user: 1322,
    name: 'Ehtel Wolfram',
    content: 'Ok',
    avatar: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png',
    online: false
  },
  {
    user: 12,
    name: 'Carol Rich',
    content: 'So what\'s going on?',
    avatar: 'http://www.creditlenders.info/wp-content/uploads/cartoon-avatar-cartoon-avatar-avatarcartoon-twitter.jpeg',
    online: true
  },
  {
    user: 12322,
    name: 'Mary Bradway',
    content: 'asdasdklajhd ;aslkhj0i [pqhoifnasd asdasdasdl awelvo82yulvo38yulow       pouirv peoar mvo iuoip urqpoiuqrwpoi umqpouqpoi uqwio a;askldb ailsdugbh ail;sdb aslkdj basdklja bsdkl bqwiu bdaso;kljdb klajjb',
    avatar: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/5.png',
    online: true
  }
]
const currentUser = 12

const ChatList = (props) => {
  const { messages } = props
  return messages.map((msg) => {
    const myMsg = props.currentUser === msg.user
    return (
      <div className='chat-message'>
        { !myMsg &&
          <div className="chat-message__avatar-container">
            <img src={msg.avatar} alt=" " className="chat-message__avatar"/>
            { msg.online ? <div className="chat-message__online"/> : null}
          </div>
        }
        <div className={`chat-message__text-container${myMsg ? '--my-message' : ''}`}>
          <div className="chat-message__name" >{msg.name}</div>
          <div className="chat-message__content" >{msg.content}</div>
        </div>
      </div>
    )
  })
}

class ChatPage extends Component {
  render () {
    return (
      <div className="chat">
        <div className="chat__header">
          <button className="chat__back-button" type="button">Back</button>
          <span className="chat__header-title">Grynchenka 20</span>
          <div className="chat__envelope-icon" />
        </div>
        <div className="chat__messages">
          <ScrollToBottom className="chat__scrollable-flex" followButtonClassName="chat__scroll-to-bot">
            <ChatList messages={ input } currentUser={currentUser} />
          </ScrollToBottom>
        </div>
        <div className="chat__input">
          <input type="text" placeholder="Message"/>
        </div>
      </div>
    )
  }
}

export default ChatPage