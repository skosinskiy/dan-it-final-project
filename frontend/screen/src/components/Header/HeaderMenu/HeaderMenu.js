import React, {Component} from 'react'
import MenuHeaderFull from './MenuHeaderFull/MenuHeaderFull'


export default class HeaderMenu extends Component{
    state ={
        isOpen: true
    }

    toggleHandler = () =>{
        this.setState((prevState) => {
            return {isOpen: !prevState.isOpen}
        })
        console.log('work')
    }
    render(){
        return(
            <MenuHeaderFull isOpen={this.state.isOpen} toggleHandler={this.toggleHandler}/>

        )
    }
}