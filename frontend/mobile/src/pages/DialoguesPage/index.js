import React, {Component} from 'react'
import DialogueList from './DialogueList'
import './dialogue-page.scss'

class DialoguesPage extends Component {
  state = {
    dialogues: [
      {name: 'Parking', lastMessage: {from: Bill, content: 'How did it happen?', time: 'Now'}, image: 'something'}
    ]
  }

  render () {
    return (
      <div className='DialoguesPage'>
        <DialogueList contacts={this.state.contacts} />
      </div>
    )
  }
}

export default DialoguesPage
