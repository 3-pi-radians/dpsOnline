import React , {Component} from 'react';
import {ace , two , three, four, five, six,seven, eight, nine, ten} from './cardPosition'
import kingclub  from './face/kingclub.jpg'
import kingheart  from './face/kingheart.jpg'
import kingdiamond  from './face/kingdiamond.jpg'
import queenspade  from './face/queenspade.jpg'
import queenheart  from './face/queenheart.jpg'
import queendiamond  from './face/queendiamond.jpg'
import queenclub  from './face/queenclub.jpg'
import jackdiamond  from './face/jackdiamond.jpg'
import jackspade  from './face/jackspade.jpg'
import jackheart  from './face/jackheart.jpg'         
import jackclub  from './face/jackclub.jpg'
import kingspade  from './face/kingspade.jpg'
import './Cardfront.css';

class Cardfront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardSuit : props.cardSuit,
      cardValue : props.cardValue, 
    }
}

selectTrump = (event) => { 

if(!this.props.trump) 
 this.props.setTrump(this.state.cardSuit);
if(this.props.trump && this.props.toggle){  
  if(this.props.canPlay){
      this.selectCard();
  }
}
}

selectCard= () => {
 this.props.throwMyCard(this.props.index)
}

checkCardSuit = () => {
  		if( this.state.cardSuit === 'hearts')
  		 return("heart");  
  		 else if( this.state.cardSuit === 'spades')
  		 return('spade' );  
  			else if(this.state.cardSuit === 'clubs')
  		 return("club");  
  		 else
  		 return("diamond");       
}
checkCardValue = () => {
    if(this.state.cardValue === 'A')
      return( <div className = 'Front'> { this.drawNumberCard(ace) } </div>);  
     if(this.state.cardValue === '2')
      return( <div className = 'Front'> { this.drawNumberCard(two) } </div>);	
    else if(this.state.cardValue === '3')
     	return (<div className = 'Front'>{this.drawNumberCard(three)} </div>);
    else if(this.state.cardValue === '4')
     	return (<div className = 'Front'>{this.drawNumberCard(four)}</div>);
    else if(this.state.cardValue === '5')
       	return(<div className = 'Front'>{this.drawNumberCard(five)}</div> );
    else if(this.state.cardValue === '6')
     	   return(<div className = 'Front'> {this.drawNumberCard(six)}</div>);
    else if(this.state.cardValue === '7')
     	  return(<div className = 'Front'> {this.drawNumberCard(seven)}</div>);
    else if(this.state.cardValue === '8')
   	   return(<div className = 'Front'>{this.drawNumberCard(eight)}</div>);
    else if(this.state.cardValue === '9')
       	return(<div className = 'Front'> {this.drawNumberCard(nine)} </div>);
    else if(this.state.cardValue === '10')
       return(<div className = 'Front'>{this.drawNumberCard(ten)}</div>);
    else if (this.state.cardValue === 'K')
       return(<div>{ this.drawFaceCard('K') }</div>);   
    else if (this.state.cardValue === 'Q')
       return(<div>{ this.drawFaceCard('Q') }</div>);   
    else 
       return(<div>{ this.drawFaceCard('J') }</div>);     
}
 drawFaceCard = (value) =>   {
   const suit = this.checkCardSuit();

   if(suit === 'spade')
       {
        if(value === 'K')
            return( <img  alt="" src={kingspade} />)
        else if(value === 'Q')
            return( <img  alt="" src={queenspade} />)
        else 
            return(<img   alt="" src={jackspade} />)
       }
    if(suit === 'heart')
       {
        if(value === 'K')
              return( <img  alt="" src={kingheart} />)
        else if(value === 'Q')
              return( <img  alt="" src={queenheart} />)
       else 
            return(<img  alt="" src={jackheart} />)
       } 
   if(suit === 'club')
         {
          if(value === 'K')
                return(<img  alt="" src={kingclub} />)
          else if(value === 'Q')
                return(<img  alt="" src={queenclub} />)
         else 
              return( <img  alt="" src={jackclub} />)
         }
    if(suit === 'diamond')
         {
          if(value === 'K')
                return(<img alt="" src={kingdiamond} />)
          else if(value === 'Q')
                return( <img alt="" src={queendiamond} /> )
         else 
              return(<img alt="" src={jackdiamond} />)
         }

}
 drawNumberCard = (value) => {
 
 let arr = [];

  let suit = this.checkCardSuit();
  if(suit === 'heart')
    suit = '\u2665' ;
  else if(suit === 'spade')
    suit = '\u2660' ;
  else if(suit === 'club')
    suit =  '\u2663' ;
  else 
    suit = '\u2666';
  let suitcolor = '';
    if(this.props.cardSuit === 'hearts' || this.props.cardSuit === 'diamonds'){
      suitcolor = 'red';
    }
    else{
      suitcolor = 'black';
    } 

for(let i= 0; i < value.length; i++) {
  arr[i] = value[i].slice();
  for(let j = 0; j< value[i].length; j++) {
    if( value[i][j] === 0) {
      if(j === value[i].length-1) {
        arr[i][j] = '\xa0\n'
      } else {
         arr[i][j] = '\xa0\xa0'; 
      }    
    }
    else 
    if(value[i][j] > 0) {
      if(value[i][j] > 1) {
        if(value[i][j] === 11)
          arr[i][j] = 'A';
        else
          arr[i][j] = value[i][j].toString();
      }
      else {
        arr[i][j] = suit;
      }
    }
    else {
      if(value[i][j] < -1){
        arr[i][j] = value[i][j].toString();
      }
      else {
        arr[i][j] = suit;
      }
    }
  }
}

 return(<div className = 'Innercontent' style = {{color : suitcolor}}>{arr}</div>);
}

render () {

    return(
      <div className ="grow ma0 pa0 br2" >
      <div className = "Cardfront" onClick = {this.selectTrump} >
      {this.checkCardValue()}      
      </div>
      </div>
      );
  
}
}
export default Cardfront;
