import React, {Component} from 'react'
import DialogueList from './DialogueList'
import icon1 from '../../img/DialoguesPage/dialogue-icon1.jpg'
import './dialogue-page.scss'

class DialoguesPage extends Component {
  state = {
    dialogues: [
      {name: 'Parking', lastMessage: {from: 'Bill', content: 'How did it happen?', time: 'Now', newMSG: false}, image: icon1},
      {name: 'Parking', lastMessage: {from: 'Bill', content: 'How did it happen?', time: 'Now', newMSG: false}, image: icon1},
      {name: 'Parking', lastMessage: {from: 'Bill', content: 'How did it happen?', time: 'Now', newMSG: false}, image: icon1},
      {name: 'Parking', lastMessage: {from: 'Bill', content: 'How did it happen?', time: 'Now', newMSG: false}, image: icon1},
      {name: 'Parking', lastMessage: {from: 'Bill', content: 'How did it happen?', time: 'Now', newMSG: false}, image: icon1},
      {name: 'Parking', lastMessage: {from: 'Bill', content: 'How did it happen?', time: 'Now', newMSG: false}, image: icon1},
      {name: 'Parking', lastMessage: {from: 'Bill', content: 'How did it happen?', time: 'Now', newMSG: false}, image: icon1},
    ]
  }

  render () {
    return (
      <div className='dialogue-page'>
        <div className='dialogue-page__header'>
          <div className='dialogue-page__title'>Messages</div>
          <a href=' ' className='dialogue-page__header-menu' />
        </div>
        <DialogueList dialogues={this.state.dialogues} />
      </div>
    )
  }
}

export default DialoguesPage
