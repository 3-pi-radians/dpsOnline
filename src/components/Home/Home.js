import React from 'react';
import './Home.css';

const Home = ({onRouteChange, user, clearUser}) => {
	
		return (
			<div className = 'Backgroundlayout'>
			<div className = 'Homenav'>
			<div className = 'Navitem'>{`₿ ${user.cash}`}</div>
			<div className = 'Navitem'>{`Hi, ${user.username}`}</div>
			<div className = 'Navitem'>{`${user.rank}`}</div>
			</div>
			<div className = 'Buttonbox'>	 
			    <input className = 'options'  type = 'submit' value = 'Play' onClick = {() => onRouteChange('play')} />	 
	 		    <input className = 'options' type = 'submit' value = 'Profile' onClick = {() => onRouteChange('profile')} />
			    <input className = 'options' type = 'submit' value = 'Best Gamblers' onClick = {() => {onRouteChange('serverpos')}} />	 		     
			    <input className = 'options' type = 'submit' value = 'signout' onClick = {() => {clearUser(); onRouteChange('login')}} />
			</div>
			</div>
		);
}

export default Home;

