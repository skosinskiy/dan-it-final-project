import React from 'react'
import {ReactComponent as ServicesLogo} from '../../../../img/icons/services.svg'
import {ReactComponent as FunLogo} from '../../../../img/icons/fun.svg'
import {ReactComponent as FoodLogo} from '../../../../img/icons/food.svg'
import {ReactComponent as ShopsLogo} from '../../../../img/icons/shops.svg'
import {ReactComponent as MapLogo} from '../../../../img/icons/map.svg'

import './MenuHeaderFull.scss'


const MenuHeaderFull= (props) => {
    return(
        <div className="header-menu" onClick={props.toggleHandler}>
            <div className={'header-menu-cross'}>
                <div className={`header-menu-icon ${props.isOpen ? 'header-menu-icon-crossed' : ''}`}></div>
                <div className={`header-menu-icon ${props.isOpen ? 'header-menu-hidden' : 'menu-visible'}`}></div>
                <div className={`header-menu-icon ${props.isOpen ? 'header-menu-icon-crossed-reverse' : ''}`}></div>
            </div>
            <div className={props.isOpen ? 'header-menu-visible' : 'header-menu-hidden'}>
                <a href='#'>
                    <div className="header-menu-item">
                        <ServicesLogo className = 'header-menu-subItem' />
                        <div>Services</div>
                    </div>
                </a>
                <a href='#'>
                    <div className="header-menu-item">
                        <FunLogo />
                        <div>Fun</div>
                    </div>
                </a>
                <a href='#'>
                    <div className="header-menu-item">
                        <FoodLogo />
                        <div>Food</div>
                    </div>
                </a>
                <a href='#'>
                    <div className="header-menu-item">
                        <ShopsLogo />
                        <div>Shops</div>
                    </div>
                </a>
                <a href='#'>
                    <div className="header-menu-item">
                        <MapLogo />
                        <div>Map</div>
                    </div>
                </a>
            </div>
        </div>
    )

}
export default MenuHeaderFull