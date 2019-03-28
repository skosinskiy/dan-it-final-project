import React, {Component} from 'react'
import MenuHeaderFull from './MenuHeaderFull/MenuHeaderFull'
import './HeaderMenu.scss'


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
            <div className={'header-menu'}>
                <MenuHeaderFull isOpen={this.state.isOpen} toggleHandler={this.toggleHandler}/>
            </div>

        )
    }
}