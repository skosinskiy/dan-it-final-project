import React, {Component} from 'react'
import CurTime from './CurTime.js'
import SearchPanel from './SearchPanel'
import MainLogo from "./MainLogo";
import TrafficConditions from './TrafficConditions'
import CurWeather from './CurWeather'
import QRCode from './QRCode'

export default class Header extends Component {

    render(){
        return(
            <div>
                <CurTime />
                <SearchPanel />
                <MainLogo />
                <TrafficConditions />
                <CurWeather />
                <QRCode />
            </div>
        )
    }
}


