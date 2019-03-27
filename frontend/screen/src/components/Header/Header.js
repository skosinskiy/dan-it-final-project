import React, {Component} from 'react'
import CurTime from './CurTime/CurTime.js'
import MainLogo from "./MainLogo/MainLogo";
import CurTrafficConditions from './CurTrafficConditions/CurTrafficConditions'
import CurWeather from './CurWeather/CurWeather'
import HeaderMenu from './HeaderMenu/HeaderMenu'


export default class Header extends Component {

    render(){
        return(
            <div>
                <HeaderMenu />
                <MainLogo />
                <CurTrafficConditions />
                <CurWeather />
                <CurTime />
            </div>
        )
    }
}


