import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/lib/animated'
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
}

]

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
        <div className="chat__header">
          <button className="chat__back-button" type="button">Back</button>
          <span className="chat__header-title">Grynchenka 20</span>
          <div className="chat__envelope-icon" />
        </div>
        <Select
          value={selectedOptions}
          onChange={value => this.setState({ selectedOptions: value })}
          closeMenuOnSelect={false}
          components={makeAnimated()}
          isMulti
          autoFocus
          options={data}
        />
      </div>
    )
  }
}

export default CreateChatPage
