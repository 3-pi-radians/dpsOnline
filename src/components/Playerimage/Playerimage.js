import React from 'react';
import Cardfront from './Cardfront/Cardfront';
import Cardback from './Cardback/Cardback';

import './Playerimage.css';

class Playerimage extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      myList : [],
    }
  }

  showPlayers = (location) => {
    if(this.props.players.playerDetail[0]){
      if(location === 'me'){
      let containSuit = false;
      if(this.props.toPlay !== undefined) {
        for(let i = 0; i < this.props.players.playerDetail[0].hasCards.length; i++) {
          if(this.props.toPlay.cardSuit === this.props.players.playerDetail[0].hasCards[i].cardSuit) {
             containSuit = true;
            break;
          }
        }        
      } else {
        containSuit = true;
      }
       return(
        <div className = 'MyList'> {
         this.props.players.playerDetail[0].hasCards.map((card, i) => {
          let canPlay = true; 
          if(containSuit){
            if(this.props.toPlay !== undefined) {
              if(this.props.toPlay.cardSuit !== card.cardSuit)
                canPlay = false;
            }            
          }

             if(i<3 || this.props.trump){   
              return(      
                  <Cardfront      
                   key = {card.id}
                   id = {card.id}
                   index ={i}
                   cardSuit = {card.cardSuit}
                   cardValue = {card.cardValue}
                   trump = {this.props.trump}
                   setTrump = {this.props.setTrump}
                   throwMyCard = {this.props.throwMyCard}
                   toggle = {this.props.toggle}
                   canPlay = {canPlay}
                  />          
              );    
           }  else return(<div key = {card.id}></div>)       
      })
   }
</div>);
}

    if(location === 'right')
      return(
        <div className= "opponentList"> { 
          this.props.players.playerDetail[1].hasCards.map((card, i) => {
            if(i < 3 || this.props.trump) {
              return(
                  <Cardback
                  key = {card.id}
                  index = {i}
                  />
              );
            } else  return(<div key = {card.id}></div>)
          })
        }
        </div>);

    if(location === 'top')
      return(
        <div className= "opponentList"> { 
          this.props.players.playerDetail[2].hasCards.map((card, i) => {
            if(i< 3 || this.props.trump) {
              return(
                  <Cardback
                    key = {card.id}
                    index = {i}
                   />
               )
            } else return(<div key = {card.id}></div>)
          })
        }
        </div>);

    if(location === 'left')
      return(
        <div className= "opponentList"> { 
          this.props.players.playerDetail[3].hasCards.map((card, i) => {
            if(i< 3 || this.props.trump) {
              return(
                   <Cardback
                    key = {card.id}
                    index = {i}
                   />
               )
            } else return(<div key = {card.id}></div>)
          })
        }
        </div>);

    if(location === 'table'){
      let tableClass = '';
      let str = '';
      return(
        <div className = 'Tablelist'> {
            this.props.tableCards.map((card, i) => { 
              if(i + this.props.initTurn < 4){
                let num = i + this.props.initTurn;
                 str = num.toString();
              }
              else {
                let num = i + this.props.initTurn - 4;
                str = num.toString();
              }              
                tableClass = 'table'.concat(str);            
              return( 
                <div className = {tableClass} key = {card.id}>  
                  <Cardfront       
                   key = {card.id}
                   id = {card.id}
                   index ={i}
                   cardSuit = {card.cardSuit}
                   cardValue = {card.cardValue}
                   trump = {this.props.trump}
                  />
                </div>
              )
            })
        }
        </div>
      );
    }
  }
  else return;
}
  render(){
    return (       
     <div className = "Playerimage">
     <div className = 'firstPlayer'>{this.showPlayers('me')}</div>
     <div className = 'rightPlayer'>{this.showPlayers('right')}</div>
     <div className = 'topPlayer'>{this.showPlayers('top')}</div>
     <div className = 'leftPlayer'>{this.showPlayers('left')}</div> 
     <div className = 'tablecards'>{this.showPlayers('table')}</div>
     </div>
    );
  }
}

export default Playerimage;

