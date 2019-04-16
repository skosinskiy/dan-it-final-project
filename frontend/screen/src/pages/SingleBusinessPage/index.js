import React, {Component} from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import * as businessOperations from "../../store/businesses/operations";
import './SingleBusinessesPage.scss'
import Preloader from '../../components/Preloader'


class SingleBusinessPage extends Component {
	componentDidMount () {
		const {getBusinessById} = this.props
    getBusinessById()
	}
	render() {
	  const {businessItems} = this.props
   
    if (!businessItems) {
      return <Preloader/>
    }
    const businessItem = businessItems.find((item)=> {
      return item.id === Number(this.props.match.params.id)
    });
    
    return (
			<div className="bp-wrapper">
				<NavLink to="/businesses/" className="bp_back-btn">
          Back
				</NavLink>
        <p className="bp-title">{businessItem.title}</p>
        <p className="bp-address">{businessItem.address}</p>
        <p className="bp-description">{businessItem.description}</p>
        <p className="bp-site">{businessItem.webSite}</p>
        <p className="bp-phone">{businessItem.phoneNumber}</p>
        <p className="bp-main-photo">{businessItem.mainPhoto}</p>
        <div className="bp-categories">
          {[...businessItem.categories.map(item => <p className="bp-categories-info__text">{item.name}</p>)]}
        </div>
        <div className="bp-photos">
          {[...businessItem.photos.map(item => <p className="bp-photo__item">{item.photo}</p>)]}
        </div>
        <div className="bp-places">
          <p className="bp-places__item">{businessItem.place.title}</p>
        </div>
			</div>
		);
	}
}


const mapStateToProps = (state, props) => {
  return {
    ...props,
		businessItems: state.businesses.businessList.content
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getBusinessById: () => dispatch(businessOperations.getBusinessById()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBusinessPage);