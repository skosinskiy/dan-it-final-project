import React, { Component } from 'react'
import Select from 'react-select'
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
        <Select
          value={ selectedOptions }
          onChange={ this.handleChange }
          options={ data }
          isMulti={true}
          closeMenuOnSelect = {false}
        />
      </div>
    )
  }
}

export default CreateChatPage
