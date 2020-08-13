import React from 'react';
import './Gamebutton.css';
const Gamebutton = ({ clickGamebutton , status , onRouteChange , clearStatus , resetStates , resetScore }) => {
   const	isLeavingGame = () => {
		if(status !== 'start') {
		 let permission = window.confirm('do you want to leave the game');
		 if(permission === true){
		   	resetStates();
		   	resetScore();
		    clearStatus();
            onRouteChange('home');
		 }			
		} else {
          onRouteChange('home')
		}
	}
return (
	<div>
 	<div className = "myButton"> 
 	<button type="button" onClick = {clickGamebutton}> {status==='distribute cards' ? 'distribute' : status} </button>
 	 </div>
 	 <div className = 'Homebutton'>
 	 <button type="button" onClick = {isLeavingGame}>HOME</button>
 	 </div>
 	 </div>
 );
}
export default Gamebutton;