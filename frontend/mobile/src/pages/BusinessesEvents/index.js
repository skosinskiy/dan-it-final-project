import React, {Component} from 'react'
import {ReactComponent as Shops} from '../../img/icons/shops.svg'
import {ReactComponent as Food} from '../../img/icons/food.svg'
import {ReactComponent as Fun} from '../../img/icons/fun.svg'
import {ReactComponent as Services} from '../../img/icons/services.svg'
import {ReactComponent as Useful} from '../../img/icons/useful.svg'
import {ReactComponent as Bee} from '../../img/icons/bee.svg'
import './businesses-events.scss'

class BusinessesEvents extends Component {
  render () {
    return (
      <div className="container">
        <div className="header">
          <div className="header-icon">
            <h2 className="header-title">Malls</h2>
            <h3 className="header-description">Sky Mall</h3>
          </div>
        </div>
        <div className="content">
          <div className="navbar">
            <h2 className="section-title">Explore</h2>
            <ul className="menu">
              <li className="menu-item">
                <div className="menu-item_icon"><Shops/></div>
                <div className="menu-item_text">Shops</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"><Food/></div>
                <div className="menu-item_text">Food</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"><Fun/></div>
                <div className="menu-item_text">Fun</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"><Services/></div>
                <div className="menu-item_text">Services</div>
              </li>
              <li className="menu-item">
                <div className="menu-item_icon"><Useful/></div>
                <div className="menu-item_text">Useful</div>
              </li>
            </ul>
          </div>
          <div className="businesses section">
            <div className="section-header">
              <h2 className="section-title">Popular near home</h2>
              <h4 className="side-title">See all</h4>
            </div>
            <div className="section-list">
              <div className="section-item">
                <div className="section-item_img"></div>
                <div className="section-item_text">
                  <div className="section-item_title">Cupcake</div>
                  <div className="section-item_address">Lva Tolstogo str, 56</div>
                </div>
              </div>
              <div className="section-item">
                <div className="section-item_img"></div>
                <div className="section-item_text">
                  <div className="section-item_title">Cupcake</div>
                  <div className="section-item_address">Lva Tolstogo str, 56</div>
                </div>
              </div>
              <div className="section-item">
                <div className="section-item_img"></div>
                <div className="section-item_text">
                  <div className="section-item_title">Cupcake</div>
                  <div className="section-item_address">Lva Tolstogo str, 56</div>
                </div>
              </div>
            </div>
          </div>
          <div className="events section">
            <div className="section-header">
              <h2 className="section-title">Events</h2>
              <div className="side-icon"><Bee/></div>
            </div>
            <div className="section-list">
              <div className="section-item">
                <div className="section-item_img"></div>
                <div className="section-item_text">
                  <div className="section-item_title">Cupcake</div>
                  <div className="section-item_address">Lva Tolstogo str, 56</div>
                </div>
              </div>
              <div className="section-item">
                <div className="section-item_img"></div>
                <div className="section-item_text">
                  <div className="section-item_title">Cupcake</div>
                  <div className="section-item_address">Lva Tolstogo str, 56</div>
                </div>
              </div>
              <div className="section-item">
                <div className="section-item_img"></div>
                <div className="section-item_text">
                  <div className="section-item_title">Cupcake</div>
                  <div className="section-item_address">Lva Tolstogo str, 56</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BusinessesEvents