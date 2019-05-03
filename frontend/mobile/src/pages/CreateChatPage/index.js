import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
import ChatHeader from '../../components/ChatHeader'
import './create-chat.scss'

const data = [{
  label: 'Tom',
  value: 123
},
{
  label: 'Jim',
  value: 123123
},
{
  label: 'Ann',
  value: 125123
},
{
  label: 'Paul',
  value: 1231373
},
{
  label: 'sdsd',
  value: 1231993
},
{
  label: 'Paul',
  value: 1231373
},
{
  label: 'sdsd',
  value: 1231993
},
{
  label: 'Paul',
  value: 1231373
},
{
  label: 'sdsd',
  value: 1231993
},
{
  label: 'Paul',
  value: 1231373
},
{
  label: 'sdsd',
  value: 1231993
}
]

const customStyles = {
  menu: (provided) => ({
    ...provided,
    width: 'calc(100vw - 30px)'
  })
}

class CreateChatPage extends Component {
  state = {
    selectedOptions: null
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption })
    console.log(`Option selected:`, selectedOption)
  }

  render () {
    const { selectedOptions } = this.state
    return (
      <div className="create-chat">
        <ChatHeader title={'Current location'} />
        <Select
          className="multi-select"
          value={selectedOptions}
          onChange={value => this.setState({ selectedOptions: value })}
          closeMenuOnSelect={false}
          components={makeAnimated()}
          styles={customStyles}
          maxMenuHeight={300}
          isMulti
          autoFocus
          options={data}
        />
        <button className="create-chat__submit-button" type='button'>Create!</button>
      </div>
    )
  }
}

export default CreateChatPage
