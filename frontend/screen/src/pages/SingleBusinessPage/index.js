import React, {Component} from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import * as businessOperations from "../../store/businesses/operations";
import './SingleBusinessesPage.scss'


class SingleBusinessPage extends Component {
	componentDidMount () {
		const {getAllBusinesses} = this.props
		getAllBusinesses()
	}
	render() {
	  const {businessItem} = this.props
    console.log(businessItem);
    return (
			<div className="business-wrapper">
				<NavLink to="/businesses/" className="business_back-btn">
          Back
				</NavLink>
        {/*<p className="bp-title">{businessItem.title}</p>*/}
        {/*<p className="bp-description">{businessItem.address}</p>*/}
        {/*<p className="bp-description">{businessItem.description}</p>*/}
        <div className="bp-categories">
          {/*{categories}*/}
        </div>
			</div>
		);
	}
}


const mapStateToProps = (state, props) => {
	return {
    ...props,
		// businessList: state.businesses.businessList
		businessItem: state.businesses.businessList.content[props.match.params.id]
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllBusinesses: () => dispatch(businessOperations.getAllBusinesses()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBusinessPage);