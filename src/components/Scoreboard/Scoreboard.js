import React from 'react';
import './Scoreboard.css';

const Scoreboard = ({ trump , score , players , turn , toPlay , status }) => {
  const displayScore = () => {
  	return(<div className = 'Score'>
  		<p style = {{margin : '1px 6px'}}>{`myTeam: hands "${score.teamX.hands}", dehl "${score.teamX.ten}"`}</p>
  		<p style = {{margin : '1px 6px'}}>{`Opponent: hands "${score.teamY.hands}", dehl "${score.teamY.ten}"`}</p>
  	</div>);
  }
  const displayTrump =  () => {
  	let suit = 'please select a suit';
  	if(trump) {
	  	if(trump === 'hearts')
	      suit = '\u2665' ;
	    else if(trump === 'spades')
	      suit = '\u2660' ;
	    else if(trump === 'clubs')
	      suit =  '\u2663' ;
	    else
	    if(trump === 'diamonds') 
	      suit = '\u2666';

	  return(<div>{`${suit}${suit} ${trump} ${suit}${suit}`}</div>);
  	} 
  	else if(players.playerDetail[0]) {
  		return(<div>{`${suit}`}</div>);
  	}
  }

  const displayTurnMessage = () => {
   if(status === 'restart') {
    if(turn === 0)
      return(<div>Your turn!</div>)
   }
  }

  const displaySuitMessage = () => {
    if(status === 'restart') {
      if(toPlay !== undefined) {
        return(<div>{`Current suit ${toPlay.cardSuit}`}</div>)
      } else {
        if(turn === 0)
          return(<div>Select any Card</div>);
      }
    } else {
      return(<div>All the best!!!</div>);
    }
  }

return (
	<div className ='Scoreboard'>
      <div className = 'Scorecontainer'>
		<div className = 'trumpDisplay'><p>TRUMP :</p>{displayTrump()}</div>
		<div className = 'scoreDisplay'><p>SCORE </p>{displayScore()} </div>
	  </div>
	  <div className = 'Aboutgame'>
     <div className = 'Gamemessage'> {displayTurnMessage()} </div>
     <div className = 'Gamemessage'> {displaySuitMessage()} </div>
    </div>
	</div>
 );
}

export default Scoreboard;
