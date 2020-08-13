import React , { Component } from 'react';
import Table from './components/Table/Table';
import Profile from './components/Profile/Profile';
import Shuttable from './components/Shuttable/Shuttable';
import Serverpos from './components/Serverpos/Serverpos';
import Playerimage from './components/Playerimage/Playerimage';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import { deck , players } from './library/card.js';
import Gamebutton from './components/Gamebutton/Gamebutton';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Signup from './components/Signup/Signup';
import { record , powerRecord } from './library/logic.js'
import './App.css';

class App extends Component {

constructor() {
  super();
  this.state = {
    status : 'start',
    deck : deck,
    players : players,
    round : 0,
    trump : '',
    turn : 0,
    tableCards : [],
    cycle : 0,
    toggle : true,
    initTurn : 0,
    currentRoute : 'login',
    user : {},
    score : {
      teamX : {
        hands : 0,
        ten : 0
      },
      teamY : {
        hands : 0,
        ten : 0
      }
    }
  }
}
loadUser = (updatedUser) => {
  this.setState(({user : {
    username : updatedUser.username,
    matches : parseInt(updatedUser.matches),
    rank : updatedUser.rank,
    cash : parseFloat(updatedUser.cash),
    exp : parseFloat(updatedUser.exp),
    winpercent : parseFloat(updatedUser.winpercent),
    won : parseInt(updatedUser.won),
    lost : parseInt(updatedUser.lost),
    averageten : parseFloat(updatedUser.averageten),
    rating : parseFloat(updatedUser.rating)
  }}),
  () => console.log('user updated at app.js'));
}

  clearUser = () => {
    this.setState({user : {}});
  }

  //  clearing status from Gamebutton  on restaring the game 
  clearStatus = () => {
    this.setState({status : 'start'});
    this.state.deck.emptyDeck();
    this.state.players.emptyPlayerDetail();
    record.resetRecord();
    powerRecord.resetPowerRecord();
  }

  clickGamebutton = () => {
    this.performStatus();
    this.changeStatus();
  }

performStatus = () => {
      if(this.state.status === 'start')
        this.state.deck.createDeck();
      if(this.state.status === 'shuffle') {
          this.state.deck.shuffle();
        }
      if(this.state.status === 'distribute cards' ) {
       this.state.players.addPlayerDetails();
       this.state.deck.distribute(this.state.players.noOfPlayers,this.state.players.toDistribute,this.state.players.playerDetail);
       record.addPlayerRecord();
       powerRecord.mostPowerInit();
       powerRecord.sortSuitInit();
      }
      if(this.state.status === 'restart' ) {  
        this.resetStates();
        this.resetScore();
        this.state.deck.emptyDeck();
        this.state.players.emptyPlayerDetail();
        record.resetRecord();
        powerRecord.resetPowerRecord();
      }
}

changeStatus = () => {
   if(this.state.status === 'start') 
    this.setState({status : 'shuffle'})
   if(this.state.status === 'shuffle') 
    this.setState({status : 'distribute cards'})
  if(this.state.status === 'distribute cards')
    this.setState({status : 'restart'})
  if(this.state.status === 'restart')
    this.setState({status : 'start'})
}

 resetStates = () => {
  this.setState({
    trump : '',
    tableCards : [],
    toggle : true,
    cycle : 0,
    turn : 0,
    initTurn : 0,
    round : 0       
  });
 }
 resetScore = () => {
  this.setState({
    score : {
      teamX : {
        hands : 0,
        ten : 0
      },
      teamY : {
        hands : 0,
        ten : 0
      }
    }
  });
 }
 upgradeScore = (t) => {
  let noOfTen = 0;
  for(let i = 0; i< this.state.tableCards.length; i++) {
    if(this.state.tableCards[i].cardValue === '10'){
      noOfTen++;
    }
  }

  if(this.state.initTurn % 2 === 0) {
    if(t % 2 === 0) {
       this.setState(prevState =>({
        score : {
          ...prevState.score, 
          teamX : {
            ...prevState.score.teamX,
            ten : prevState.score.teamX.ten + noOfTen,
            hands : prevState.score.teamX.hands+1
          }
        }
       })) 
    }
    else {
       this.setState(prevState =>({
        score : {
          ...prevState.score, 
          teamY : {
            ...prevState.score.teamY,
            ten : prevState.score.teamY.ten + noOfTen,
            hands : prevState.score.teamY.hands+1
          }
        }
       }));
    }    
  }
  else{
    if(t % 2 === 0) {
       this.setState(prevState =>({
        score : {
          ...prevState.score, 
          teamY : {
            ...prevState.score.teamY,
            ten : prevState.score.teamY.ten + noOfTen,
            hands : prevState.score.teamY.hands+1
          }
        }
       }));     
    }
    else {
       this.setState(prevState =>({
        score : {
          ...prevState.score, 
          teamX : {
            ...prevState.score.teamX,
            ten : prevState.score.teamX.ten + noOfTen,
            hands : prevState.score.teamX.hands+1
          }
        }
       }));    
    }
  }
}

setTrump = (cardSuit) => {
  this.state.deck.decideTrump(cardSuit);
  this.state.deck.increasePower();                
  this.setState({trump : cardSuit });  
}

changeToggle = () => {
this.setState(({
  toggle : !this.state.toggle
}),
 () =>{
 // console.log('this is value of toggle ........ ',this.state.toggle);
  if(this.state.turn === 1)
  this.throwBackCard();
})
}
checkTurn =()=> {
 this.setState(({initTurn : this.state.turn}),
    ()=> {
    //console.log('initturn from checkTurn ', this.state.initTurn)
  });
if(this.state.turn === 0 && this.state.status === 'restart')
   this.changeToggle();
else
  this.throwBackCard();
}

checkTableMax = () => {
 let t = 0;
 t = this.checkPower();
 this.upgradeScore(t);
 this.resetTableCards();                 //********** tablecards and cycle gets reset  
   if(this.state.round < 13) {
     if(t + this.state.initTurn < 4)
    this.setState(({
      turn : this.state.initTurn + t,
    })
    ,()=> {
      setTimeout(() => {this.checkTurn()}, 1500)})
   else 
    this.setState(({
      turn  : this.state.initTurn + t -4,
    }),()=> {
      setTimeout(()=> {this.checkTurn()}, 1500)})
   }
 else {
  setTimeout(()=> {  
    this.resetStates();
    this.onRouteChange('shuttable')
  }, 1000)
 }
 }
 checkPower = () => {
   let max  = 0;
    for(let i= 1; i<this.state.tableCards.length;i++){
      if(this.state.tableCards[max].power < this.state.tableCards[i].power) {
        if(this.state.tableCards[i].cardSuit === this.state.tableCards[0].cardSuit || this.state.tableCards[i].cardSuit === this.state.trump)
        max = i;  
      }
    }
   return max;
 }

resetTableCards = () => {
  this.setState({
    tableCards : [],
    cycle : 0,
    round : this.state.round +1
  });
}

changeTurn = () => { 
    if(this.state.turn === 0) {
      this.setState(
        ({turn : 1}) ,
        () => {
            setTimeout(()=> {if(this.state.toggle === true && this.state.status === 'restart'){this.changeToggle();}}, 3000)        
        }
      )}
    if(this.state.turn === 1) {
      this.setState(({turn : 2}),()=> {setTimeout(()=> {this.throwBackCard();} , 3000)})  
    }
    if(this.state.turn === 2)
      {this.setState(({turn : 3}),()=> {setTimeout(()=> {this.throwBackCard();} , 3000)})}
    if(this.state.turn === 3){     
      this.setState(
        ({turn : 0})
        ,() => {
          setTimeout(()=> {if(this.state.toggle === false){this.changeToggle();}} , 400)});
    }    
}

upgradeCycle = () => {
  if(this.state.cycle === 3)
    this.setState({cycle : 0});
  else
    this.setState({cycle : this.state.cycle +1});
}

  checkCycle = () => {    
    if(this.state.cycle === 3) {
      setTimeout(()=> {if(this.state.toggle === false){this.checkTableMax()}}, 2000);
    }
    else {
      this.upgradeCycle(); this.changeTurn();
    }
  }
  
  throwBackCard = () => {
    if(this.state.status === 'restart' && this.state.turn !== 0) {
      let index = 0;
    let arr = this.state.players.playerDetail[this.state.turn].hasCards; 
    if(this.state.tableCards.length > 0) {
      index = record.masterFunc(this.state.turn,this.state.cycle,this.state.tableCards[this.state.cycle-1]);
    }
    else {
      index = record.masterFunc(this.state.turn,this.state.cycle);
    }
    let myCard = arr.splice(index,1);  
      this.setState(Object.assign(this.state.players.playerDetail[this.state.turn], {hasCards : arr}))
    this.setState(({
      tableCards : this.state.tableCards.concat(myCard[0])
    }),
    () => {
      record.updateTableCards(myCard[0]);
      record.updatePlayerRecord(this.state.turn); 
      powerRecord.sortSuitUpdate(myCard[0]);
      this.checkCycle();
    });        
    }
  }

throwMyCard = (i) => {  
  if(this.state.turn === 0 && this.state.status === 'restart'){
    record.masterFunc(this.state.turn, this.state.cycle);
    let arr = this.state.players.playerDetail[this.state.turn].hasCards;
    let myCard =  arr.splice(i,1);
    if(this.state.cycle ===3)
      this.changeToggle();
      this.setState(Object.assign(this.state.players.playerDetail[this.state.turn], {hasCards : arr}))
    this.setState(({
      tableCards : this.state.tableCards.concat(myCard[0])
    }),
    () => { 
      record.updateTableCards(myCard[0]);
      record.updatePlayerRecord(this.state.turn); 
      powerRecord.sortSuitUpdate(myCard[0]);
      this.checkCycle();
    });
  }    
}
 onRouteChange = (route) => {
  this.setState({currentRoute : route});
 }

  
checkcurrentRoute = () => {
  if(this.state.currentRoute === 'login') {
    return(
      <Login
      onRouteChange = {this.onRouteChange} 
      loadUser = {this.loadUser}
      />
    );
  }
  else
  if(this.state.currentRoute === 'signup') {
    return(
      <Signup
      onRouteChange = {this.onRouteChange} 
      />
    );
  }
  else
  if(this.state.currentRoute === 'home') {
    return(
      <Home
      onRouteChange = {this.onRouteChange}
      user = {this.state.user}
      clearUser = {this.clearUser}
      />
    );
  }
  else
  if(this.state.currentRoute === 'profile') {
    return(
      <Profile 
      onRouteChange = {this.onRouteChange}
      user = {this.state.user}
      />
    );
  }
  else
  if(this.state.currentRoute === 'play')
   {
    return (
      <div> 
        <Table 
        status = {this.state.status}
        />
        <Gamebutton
        status = {this.state.status}
        clickGamebutton = {this.clickGamebutton}
        onRouteChange = {this.onRouteChange}
        clearStatus = {this.clearStatus}
        resetStates = {this.resetStates}
        resetScore = {this.resetScore}
        />   
        <Playerimage
        toPlay = {this.state.tableCards[0]}
        players = {this.state.players}
        trump = {this.state.trump}
        setTrump = {this.setTrump}
        tableCards = {this.state.tableCards}
        throwMyCard = {this.throwMyCard}
        toggle = {this.state.toggle}
        initTurn = {this.state.initTurn}
       />
        <Scoreboard 
        trump = {this.state.trump}
        score  = {this.state.score} 
        players = {this.state.players}
        turn = {this.state.turn}
        toPlay = {this.state.tableCards[0]}
        status = {this.state.status}
        />   
      </div>
    );
  }
  else
  if(this.state.currentRoute === 'shuttable') {
    return(
    <Shuttable 
    onRouteChange = {this.onRouteChange}
    score = {this.state.score}
    user = {this.state.user}
    loadUser ={this.loadUser}
    clearStatus = {this.clearStatus}
    resetStates = {this.resetStates}
    resetScore = {this.resetScore}
    />
    );
  }
  else 
  if(this.state.currentRoute === 'serverpos') {
    return(
      <Serverpos 
      user = {this.state.user}
      onRouteChange = {this.onRouteChange}
      />
    );
  }
}

render() {
  return (<div className = "App">{this.checkcurrentRoute()}</div>);
}
}
export default App;
