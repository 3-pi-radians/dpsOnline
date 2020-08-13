import React , { Component } from 'react';
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}
	render() {
		return (
			<div className = 'Backgroundlayout'>
			<div className = 'Homenav'>
			<div className = 'Navitem'>{`₿ ${this.props.user.cash}`}</div>
			<div className = 'Navitem'>{`Hi, ${this.props.user.username}`}</div>
			<div className = 'Navitem'>{`${this.props.user.rank}`}</div>
			</div>
			<div className = 'Buttonbox'>	 
			    <input className = 'options'  type = 'submit' value = 'Play' onClick = {() => this.props.onRouteChange('play')} />	 
	 		    <input className = 'options' type = 'submit' value = 'Profile' onClick = {() => this.props.onRouteChange('profile')} />
			    <input className = 'options' type = 'submit' value = 'Best Gamblers' onClick = {() => {this.props.onRouteChange('serverpos')}} />	 		     
			    <input className = 'options' type = 'submit' value = 'signout' onClick = {() => {this.props.clearUser(); this.props.onRouteChange('login')}} />
			</div>
			</div>
		);
	}
}

export default Home;

