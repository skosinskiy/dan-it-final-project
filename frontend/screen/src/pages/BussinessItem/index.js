import React, {Component} from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import * as businessOperations from "../../store/businesses/operations";


class BussinessItem extends Component {
	render() {
		return (
			<div>
				<NavLink to="/businesses/">
					Back
				</NavLink>
				<button onClick={this.props.getAllBusinesses}>gogi</button>
			</div>
		);
	}
}


const mapStateToProps = (state, props) => {
	return {
		businessList: state.businesses.businessList
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllBusinesses: () => dispatch(businessOperations.getAllBusinesses()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BussinessItem);