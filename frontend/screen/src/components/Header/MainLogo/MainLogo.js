import React from 'react'
import {ReactComponent as Logo} from '../../../img/icons/MainLogo.svg';
import './MainLogo.scss'

const MainLogo = () =>{
    return(
        <div className='main-logo'>
            <Logo />
        </div>
    )
}

export default MainLogo