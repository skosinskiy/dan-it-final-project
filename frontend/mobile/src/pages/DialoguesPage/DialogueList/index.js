import React, {Component} from 'react'
import DialogueItem from './DialogueItem'
import './dialogue-list.scss'

class DialogueList extends Component {
  render () {
    const listItems = this.props.dialogues.map((item) => <DialogueItem key={item.id} item={item} />)
    return (
      <ul className='dialogue-list'>
        {listItems}
      </ul>
    )
  }
}

export default DialogueList
