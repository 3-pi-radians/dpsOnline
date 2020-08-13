import {deck , players} from './card.js'

let powerRecord = {
  mostPower : [],                 //*********************** array containing record of most powerful card of respective suits
  leastPower : [],        
  sortSuit : {
    spades : [],
    hearts : [],
    clubs : [],
    diamonds : []
  },

  sortSuitInit() {
    for(let i = 0; i< deck.card.length; i++) {

      if(deck.card[i].cardSuit ==="spades") {
        this.sortSuit.spades.push(deck.card[i]);
      }
      else
      if(deck.card[i].cardSuit ==="hearts"){
        this.sortSuit.hearts.push(deck.card[i]);
      }
      else
      if(deck.card[i].cardSuit ==="clubs") {
        this.sortSuit.clubs.push(deck.card[i]);
      }
      else
        this.sortSuit.diamonds.push(deck.card[i]);
    }
      this.sortSuit.spades.sort((a , b) =>{return(a.power - b.power)});
      this.sortSuit.hearts.sort((a , b) =>{return(a.power - b.power)});
      this.sortSuit.clubs.sort((a , b) =>{return(a.power - b.power)});
      this.sortSuit.diamonds.sort((a , b) =>{return(a.power - b.power)});
  },    

  sortSuitUpdate (cardDetail) {
    let index = 0;
    for(const [key , value] of Object.entries(this.sortSuit)) {
      if(key === cardDetail.cardSuit && value.length > 1) {
        for(let i = 0; i < value.length; i++) {
          if(value[i].id === cardDetail.id){
            index = i;  
            break;
          }
        }
        if(key === 'spades') {
          this.sortSuit.spades.splice(index,1); break;
        }
        if(key === 'hearts') {
          this.sortSuit.hearts.splice(index,1); break;
        }
        if(key === 'clubs') {
          this.sortSuit.clubs.splice(index,1); break;
        }
        if(key === 'diamonds') {
          this.sortSuit.diamonds.splice(index,1); break;
        }
      }
    }

  },
  mostPowerInit() {
    for(let i= 0; i<deck.card.length; i++) {
      if(deck.card[i].cardValue === 'A')
        this.mostPower.push(deck.card[i]);
    }
  },

  mostPowerUpdate() {

       for(let i = 0; i < 4; i++){
        if(this.mostPower[i].cardSuit === 'spades') {
          this.mostPower[i] = this.sortSuit.spades[this.sortSuit.spades.length-1];
        }
        else
        if(this.mostPower[i].cardSuit === 'hearts') {
          this.mostPower[i] = this.sortSuit.hearts[this.sortSuit.hearts.length-1];
        }
        else
        if(this.mostPower[i].cardSuit === 'clubs') {
          this.mostPower[i] = this.sortSuit.clubs[this.sortSuit.clubs.length-1];
        }
        else       
          this.mostPower[i] = this.sortSuit.diamonds[this.sortSuit.diamonds.length-1];
      }
      //console.log('this is mostPower ', this.mostPower);
  },

  isMaxPower(cardDetail) {
   let isMax = false;
   for(let i = 0;i< this.mostPower.length;i++) {
    if(this.mostPower[i].id === cardDetail.id){
      isMax = true; break;
    }
   }
   return isMax; 
  },

  resetPowerRecord() {
    this.mostPower = [];
    this.leastPower = [];
  }
}

let record = {
    remainingTen : ['spades', 'hearts', 'clubs', 'diamonds'],
    round : 0,
    minIndex : 0,
    maxIndex : 0,
    playerRecord : [],
    sortedCards : [],
    table_Cards : [],
    Turn : 0,
    Cycle :0,
    POT : 0,
    card_Detail : {},
    initialDetails  : {},

  addPlayerRecord() {
     for(let i = 0; i< 4;i++) {
      this.playerRecord.push({
        myArr :[],
        myTen : [],
        haveTrump : false
      });
      this.sortedCards.push({
        spades : [],
        hearts : [],
        clubs : [],
        diamonds : []
      });
      this.updatePlayerRecord(i);
      this.addSortedCardArray(i);
     }
   },

   addSortedCardArray(turn) {
    let secondArr = this.playerRecord[turn].myArr;

    for(let i = 0; i < secondArr.length; i++) {
      if(secondArr[i].cardSuit === 'spades') {
        this.sortedCards[turn].spades.push(secondArr[i]);
      }
      else
      if(secondArr[i].cardSuit === 'hearts'){
        this.sortedCards[turn].hearts.push(secondArr[i]);     
      }
      else
      if(secondArr[i].cardSuit === 'clubs') {
        this.sortedCards[turn].clubs.push(secondArr[i]);
      }
      else{
        this.sortedCards[turn].diamonds.push(secondArr[i]);
      }
    }
    if(this.sortedCards[turn].spades.length){
      this.sortedCards[turn].spades.sort((a , b) =>{return(a.power - b.power)})}
    if(this.sortedCards[turn].hearts.length){
      this.sortedCards[turn].hearts.sort((a , b) =>{return(a.power - b.power)})}
    if(this.sortedCards[turn].clubs.length){
      this.sortedCards[turn].clubs.sort((a , b) =>{return(a.power - b.power)})}
    if(this.sortedCards[turn].diamonds.length){
      this.sortedCards[turn].diamonds.sort((a , b) =>{return(a.power - b.power)})}

  },

  updateSortedCards(cardDetail) {

   let found = 0;
   let i = 0;

   while(found !== 1) {
    if(cardDetail.cardSuit === 'spades') {
      if(this.sortedCards[this.Turn].spades[i].id === cardDetail.id) {     
       this.sortedCards[this.Turn].spades.splice(i,1);
        found = 1;
      } 
      else i++;
    }
    else
    if(cardDetail.cardSuit === 'hearts') {
      if(this.sortedCards[this.Turn].hearts[i].id === cardDetail.id) {
        this.sortedCards[this.Turn].hearts.splice(i,1);
        found = 1;
      } 
      else i++;
    }
    else
    if(cardDetail.cardSuit === 'clubs') {
      if(this.sortedCards[this.Turn].clubs[i].id === cardDetail.id) {
        this.sortedCards[this.Turn].clubs.splice(i,1);
        found = 1;
      } 
      else i++;
    }
    else {
      if(this.sortedCards[this.Turn].diamonds[i].id === cardDetail.id) {
         this.sortedCards[this.Turn].diamonds.splice(i,1);
        found = 1;
      } 
      else i++;
    }
   }
  },

   updateTableCards(cardDetail) {                       // most recent card on the table
    this.updateSortedCards(cardDetail);
    if(cardDetail.cardValue === '10')
    this.updateRemainingTen(cardDetail);
    if(this.Cycle === 3) {
      powerRecord.mostPowerUpdate();
      this.table_Cards = [];
      this.initialDetails = {};
    }
    else {
      if(this.Cycle === 0){
        this.fillInitialDetails(cardDetail);
      }
      this.table_Cards.push(cardDetail);
      
    }
  },

   masterFunc(turn,cycle,cardDetail) {                    //*********************** cardDetail = previous card
   
    this.Turn  = turn;
    this.Cycle = cycle;
    let index = 0;
    if(!cardDetail) {
      if(this.Turn === 0) {
        return;
      }
      else {
       index = this.playBotTurn();   // throws first card on the table
      }
    }
    else{
      this.card_Detail = cardDetail;
      index = this.CheckCondition();    // throws a card on table other than first card
    }
    //console.log('this is remainingTen from masterFunc',this.remainingTen);
    return index;
 
  },

  fillInitialDetails(cardDetail) {
    this.initialDetails.cardSuit = cardDetail.cardSuit;
    this.initialDetails.cardValue = cardDetail.cardValue;
    if(cardDetail.cardSuit === deck.trump)
      this.POT = 22;
    else
      this.POT = 9;
  },

  updateRemainingTen(cardDetail) {
    let index = 0;
      for (var i = 0; i < this.remainingTen.length; i++) {
        if(this.remainingTen[i] === cardDetail.cardSuit) {
          index = i; break;
        }
      }
      this.remainingTen.splice(index,1);
  },

   updatePlayerRecord(i) {   
    this.playerRecord[i].myArr = players.playerDetail[i].hasCards;
    this.checkTrump(i);
    this.checkMyTen(i);
   }, 

   checkTrump(ind) {
    let found = 0;
     for(let i =0; i<this.playerRecord[ind].myArr.length; i++) {
        if(this.playerRecord[ind].myArr[i].cardSuit === deck.trump)
          {found = 1; break; }
     }
     if(found === 1)
      this.playerRecord[ind].haveTrump = true; 
     else
      this.playerRecord[ind].haveTrump = false; 
  },

  checkMyTen(ind) {
    let arr = [];
    this.playerRecord[ind].myArr.forEach(card => {
      if(card.cardValue === '10')
        arr.push(card.cardSuit);   
    });
     this.playerRecord[ind].myTen = arr;
  },

  checkIndex(tempArr) {

    let min = 0;
    let pre = 0;
    let max = 0;
    let flagMin = false;
    let flagMax = false;
    let flagPre = false; 
    let secondArr = this.playerRecord[this.Turn].myArr;

     
    if(this.initialDetails.cardSuit === 'spades')
      max = tempArr.length-1;
    else
      if(this.initialDetails.cardSuit === 'hearts')
        max = tempArr.length-1;
      else
        if(this.initialDetails.cardSuit === 'clubs')
          max = tempArr.length-1;
        else
          max = tempArr.length-1;

    (max === 0)?(pre = 0):(pre = 1);

    for(let i = 0; i <secondArr.length; i++) {
      if(flagMax === false && tempArr[max].id === secondArr[i].id){
        max = i; flagMax = true;
      }
      if(flagMin === false && tempArr[min].id === secondArr[i].id){
        min = i; flagMin = true;
      }
      if(flagPre === false && tempArr[pre].id === secondArr[i].id){
        pre = i; flagPre = true;
      }      
    }
    // console.log(' min ',min);
    // console.log(' pre ',pre);
    // console.log(' max ',max);
 
    this.maxIndex = max;
    if(secondArr[min].cardValue === '10')
      this.minIndex = pre;
    else 
      this.minIndex = min;
  },

  checkPower(tempArr) {
    let min = 0;
    let max = 0;

    for(let i= 1; i<tempArr.length;i++){
      if(tempArr[min].power>tempArr[i].power) {
        if(tempArr[min].cardSuit === this.initialDetails.cardSuit || tempArr[min].cardSuit === deck.trump)
        min = i;
      }
          
      if(tempArr[max].power<tempArr[i].power) {
        if(tempArr[max].cardSuit === this.initialDetails.cardSuit || tempArr[max].cardSuit === deck.trump)
        max = i;  
      }
    }
    return max;
  },

   throwGrThanTen(cardDetail) {
    let index = 0;
    let found = 0;
    let tempArr = [];

    for(const [key , value] of Object.entries(this.sortedCards[this.Turn])) {
      if(this.initialDetails.cardSuit === key) {
        tempArr = value;
        for(let i = 0; i< value.length; i++) {
         if(value[i].power > this.POT) {
          if(cardDetail) {
            if(value[i].power > cardDetail.power) {
              found = 1; index  = i; break;
            }         
          }
          else {
            found = 1; index  = i; break;
          }          
         }
        }       
      }
    }

 if(found === 1) {
    for(let i = 0; i <this.playerRecord[this.Turn].myArr.length; i++) {
      if(tempArr[index].id === this.playerRecord[this.Turn].myArr[i].id) {  
        index = i; break;   
      }
    }
    return index;
    }
    else
      return this.minIndex;

   },

  throwTen(tempArr) {
    let index = 0;
   let secondArr = this.playerRecord[this.Turn].myArr;
   for(let i = 0; i < secondArr.length; i++) {
    if(tempArr.length > 0) {
      if(secondArr[i].cardSuit === this.initialDetails.cardSuit) {
        if(secondArr[i].cardValue === '10') {
          index = i;
          break;
        }  
      }
    }
    else {
     if(secondArr[i].power === 22 )
      index = i;   
      break;   
    }
   }
  return index;
  },

  throwTrump(cardDetail) {
    let index = 0;
    let flag = 0;
    let secondArr = this.playerRecord[this.Turn].myArr;
    let tempArr = [];

    for(const [key , value] of Object.entries(this.sortedCards[this.Turn])) {
      if(key === deck.trump) {
        tempArr = value;
        for(let i = 0;i < tempArr.length; i++) {
          if(cardDetail) {
            if(tempArr[i].power > cardDetail.power)
              { index = i; flag = 1; break; }
          }
          else {
            index = i; flag = 1;
            break;
          }
        }     
      }
    }
    if(flag === 0) {                                                 //**************card not greater than cardDetail
      index = this.throwOtherCard();
      return index;
    } 
   
   for(let i  = 0; i < secondArr.length; i++) {
    if(tempArr[index].id === secondArr[i].id) {
      index = i; break;
    }
   }
    return index;
  },

  throwOtherTen() {  
    for(let i = 0; i<this.playerRecord[this.Turn].myArr.length; i++) {
      if(this.playerRecord[this.Turn].myArr[i].cardValue === '10') 
        return i;
    }
  },

  throwOtherCard() {    
     let index  = 0;
     let cardId = 0;
     let flag = 0;
     let count = 0;
     let secondArr = this.playerRecord[this.Turn].myArr;
     while(flag === 0) {
       for(const [key , value] of Object.entries(this.sortedCards[this.Turn])) {
        //console.log('this is key', key)
        if(count === 0) {
          if(value.length > 0 && key !== deck.trump && !(this.playerRecord[this.Turn].myTen.includes(key)) 
            && this.remainingTen.includes(key)) {
              if(value.length === 1) {

              }
            cardId = value[0].id; flag = 1; break;
          }        
        }
        if(count === 1) {
          if(value.length > 0 && key !== deck.trump && !(this.playerRecord[this.Turn].myTen.includes(key))) {
              cardId = value[0].id; flag = 1; break;
          }
        }
        if(count === 2) {
          if(value.length > 0 && key !== deck.trump){
            
            if(value.length === 1)
              cardId = value[0].id; 
            else {
              if(value[0].cardValue === '10')
                cardId = value[1].id;
              else
                cardId = value[0].id;
            }
            flag = 1; break;
          }
        }
        if(count === 3) {
          if(value.length > 0) {
            if(value.length === 1) 
              cardId = value[0].id;
            else {
              if(value[0].cardValue === '10')
                cardId = value[1].id;
              else
                cardId = value[0].id;
            }
            flag = 1; break;
          }
        }
       }   
       count++;   
     }
     for(let i = 0; i < secondArr.length; i++) {
      if(secondArr[i].id === cardId) {
        index = i; break;
      }
     }
    return index;
  },

  playBotTurn()  {
    let index = 0;
    let found = 0;
    let cardId = 0;
    let secondArr = this.playerRecord[this.Turn].myArr;

    while(found === 0) {
      for(const [key , value] of Object.entries(this.sortedCards[this.Turn])) {
        if(value.length > 2 && this.playerRecord[this.Turn].myTen.includes(key)) {
            if(value[0].cardValue === '10')
              cardId = value[1].id;
            else
              cardId = value[0].id;

            found =1; break;
        }

        if(value.length > 0 && this.remainingTen.includes(key) && !this.playerRecord[this.Turn].myTen.includes(key)){  // returns most powercard
           
           for(let i = 0; i< powerRecord.mostPower.length; i++) {
            if(value.includes(powerRecord.mostPower[i])) {
              cardId = powerRecord.mostPower[i].id; found =1;
            }
           }

          if(found === 1){
            break;
          }
        }
        if(value.length > 0 && !(this.remainingTen.includes(key))) {
          cardId = value[0].id; found = 1; break;
        }

        if(value.length > 2 && key === deck.turmp) {
          if(value[0].cardValue === '10')
            cardId = value[1].id;
          else
            cardId = value[0].id;

          found = 1;
          break;
        }
        if(value.length > 1 && key !== deck.turmp){
         if(value[0].cardValue === '10')
          cardId = value[1].id;
        else
          cardId = value[0].id;

        found = 1; break;
        }
      }
      found = 1;;
    }
    
    for(let i = 0; i< secondArr.length; i++) {
      if(cardId === secondArr[i].id){
        index = i;
        break;
      }
    }
 return index;
  },

  CheckCondition() {                                  
    //console.log('this is initialDetails ', this.initialDetails);
    let containTen  = false;                     //*************** true if ten of this suit is contained by player
    let tempArr = [];                            //**************** contains card of required Suit
    let index = 0;

    if(this.initialDetails.cardSuit === 'spades'){
      tempArr = this.sortedCards[this.Turn].spades;
    }
    else
    if(this.initialDetails.cardSuit === 'hearts') {
      tempArr = this.sortedCards[this.Turn].hearts;
    }
    else
    if(this.initialDetails.cardSuit === 'clubs') {
      tempArr = this.sortedCards[this.Turn].clubs;
    }
    else {
      tempArr = this.sortedCards[this.Turn].diamonds;
    }

    if(tempArr.length > 0){
      tempArr.forEach(card => {
        if(card.cardValue === '10')
          containTen = true;
      });
      this.checkIndex(tempArr);
    }


    if(this.Cycle === 1) {
       //console.log('hello this is cycle 1 ')
      if(tempArr.length){                                                //********** if i have required cardsuit
        if(containTen) {
          index = this.minIndex;
        }
        else {
          if(powerRecord.isMaxPower(this.table_Cards[0])){              // if first card has maximum power
            index = this.minIndex;
          }
          else {                                                        //when [0] is not max power
             if(this.table_Cards[0].cardValue === '10'){           //  but [0] is 10
              index = this.maxIndex;
            }
            else {
               if(powerRecord.isMaxPower(this.playerRecord[this.Turn].myArr[this.maxIndex])) { //checks whether i have max of card available
                index =  this.maxIndex
              } 
              else {
                index =  this.minIndex;
              }
            }
          }
        }
      }    
      else {                                                       // ******* i dont have the cardSuit
        if (powerRecord.isMaxPower(this.table_Cards[0])) {         //************** if [0] is the most powerFull card
          if(this.playerRecord[this.Turn].haveTrump)
            index =  this.throwTrump()                             // then throw trump
          else{
            index = this.throwOtherCard();
          }
        } 
        else {
          if(this.playerRecord[this.Turn].myTen.includes(deck.trump))
            index =  this.throwTen(tempArr);
          else 
            index =  this.throwOtherCard();
        }
      }

      return index;
     }  
    
    if(this.Cycle === 2){

      if(tempArr.length > 0) {
        if(this.table_Cards[0].power > this.table_Cards[1].power) {    //************ in  Favour
          if(powerRecord.isMaxPower(this.table_Cards[0])) {             //***************** [0] is the max power
            if(containTen)                                             //********** if ten then throw
              index = this.throwTen(tempArr);
            else                                                       // else throw other
              index =  this.minIndex;            
          } 
          else {                                               //********** else [0] is not max power  
            if(this.remainingTen.includes(this.initialDetails.cardSuit)) {   //******* ten of this suit is remaining
              if(this.table_Cards[0].power > this.POT) {                  //************ if [0].power is greater than POT
                 index = this.minIndex;                                       //*************** then throw minindex
              }
              else                                                     //   tablecards[0].power is less than or equal to POT
              { 
                  index =  this.throwGrThanTen();                             // save the round
              }
            }
            else {    
               if(this.table_Cards[0].cardValue === '10')                   // tablecards[0] is a ten
                  index = this.maxIndex;
                else                                               //********************* 10 is not remaining
                 index  = this.minIndex;
            }
          }
        }
        else {                                                       //************* [1].power > [0].power
          if(this.table_Cards[1].cardSuit === deck.trump) {          //********* previous player played turmp
            if(this.initialDetails.cardSuit === deck.trump) {        //*********** if initial chance is also of trump 
              if(containTen)                                         // *********** if player have the ten of trump
                index =  this.minIndex;
              else
                index =  (this.throwGrThanTen(this.table_Cards[1]))         // ********** otherwise throw greater than 10 but also greater than previous card
            } 
            else
              index =  this.minIndex;                                  //************ if initial was not trump then throw minIndex
          }
          else {                                                  //************** if[1] have not played trump (still [1] > [0])
            if(powerRecord.isMaxPower(this.table_Cards[1])) 
              index =  this.minIndex;
            else {                                              //************ if [1] is  not the max power in its suit
               if(containTen)
                index =  this.minIndex;
              else {
                index =  this.throwGrThanTen(this.table_Cards[1]);    //************ throw card greater than ten and previos card
              }             
            }
          }
        }
      }
      else {                                                  // ********** player dont have the required cardSuit
        if(this.table_Cards[0].power > this.table_Cards[1].power){      //******** [0] is powerful than [1]
          if(powerRecord.isMaxPower(this.table_Cards[0])){             //********* [0] is most powerful
            if(this.playerRecord[this.Turn].myTen)          //************ but if player have any other ten
              index = this.throwOtherTen();
            else
              index =  this.throwOtherCard();
          }
          else {                                         //************ [0] player card is not most powerful
            if(this.table_Cards[0].power > this.POT)          //****** but [0] is powerful enough to save the ten
              index =  this.throwOtherCard();
            else {
              if(this.playerRecord[this.Turn].haveTrump) 
                index =  this.throwTrump();
              else
                index = this.throwOtherCard();
            }
          }
        }
        else {                               //************* if [1] is more powerful than [0]
          if(this.table_Cards[1].cardSuit === deck.trump){
            if(this.initialDetails.cardSuit === deck.trump)
              index =  this.throwOtherCard();                 //*********** if the round is of trump but player dont have it
            else
              if(this.playerRecord[this.Turn].haveTrump) {
                index =  this.throwTrump(this.table_Cards[1])   //********** if i have trump then throw greater trump otherwise throw other small index
              }
              else
                index =  this.throwOtherCard();
          }
          else {                                            
            if(this.playerRecord[this.Turn].haveTrump)
              index = this.throwTrump();
            else
              index = this.throwOtherCard(); 
          }
        }
      }
       return index;
    }
    if(this.Cycle === 3) {
      
      if(tempArr.length) {
        if(this.table_Cards[1].power > this.table_Cards[0].power && this.table_Cards[1].power > this.table_Cards[2].power) {  //*** our favour
          if(containTen) {
            index = this.throwTen(tempArr);
          }
          else 
            index = this.minIndex;
        }
        else {                    //****** not our favour
          if(this.table_Cards[0].cardValue === '10' || this.table_Cards[1].cardValue === '10' || this.table_Cards[2].cardValue === '10') { //any ten on table
             if(this.table_Cards[2].cardSuit === deck.trump) {        //******* if[2] has played trump
              if(this.table_Cards[0].cardSuit === deck.trump) {       //********** if round is of trump
                if(this.table_Cards[0].power > this.table_Cards[2].power)  // **** compare and throw greater than bigger of the two opponent
                  index =  this.throwGrThanTen(this.table_Cards[0]);
                else
                  index = this.throwGrThanTen(this.table_Cards[2]);
             }
             else {                               //***** round is not of trump but [2] have played trump
              index = this.minIndex;
             }
          }                                       //****************** if[2] has not played trump
          else {
            if(this.table_Cards[0].power > this.table_Cards[2].power)   //*******  compare between [0] and[2] and throw bigger than both 
              index =  this.throwGrThanTen(this.table_Cards[0]);
            else
              index =  this.throwGrThanTen(this.table_Cards[2]);
          }
        }
        else {                                     //*************** if there are not any ten on the table
          if(containTen) {                          //********************* if i have ten of this cardsuit
            if(this.table_Cards[0].power > this.POT || this.table_Cards[2].power > this.POT)  //*************** if any of the opponenet have thrown greaer than 10
              index = this.minIndex;
            else
              index = this.throwTen(tempArr);
          }
          else {
            index = this.minIndex;
          }
        }
      }
    }
      else {                                                //********************* i dont have the cardSuit
        if(this.table_Cards[1].power > this.table_Cards[0].power && this.table_Cards[1].power > this.table_Cards[2].power) {   // our favour
          if(this.playerRecord[this.Turn].myTen) 
            index = this.throwOtherTen();

          else
            index =  this.throwOtherCard();          
        }
        else {                                               // not our favour
           if(this.table_Cards[0].cardValue === '10' || this.table_Cards[1].cardValue === '10' || this.table_Cards[2].cardValue === '10') {
             if(this.table_Cards[2].cardSuit === deck.trump){
              if(this.table_Cards[0].cardSuit === deck.trump) 
                index = this.throwOtherCard();
              else {
                if(this.playerRecord[this.Turn].haveTrump)
                  index = this.throwTrump(this.table_Cards[2]);
                else 
                  index = this.throwOtherCard();
              }
             }
             else {
              if(this.playerRecord[this.Turn].haveTrump)
                index = this.throwTrump();
              else
                this.throwOtherCard();
             }
           }
           else 
            index = this.throwOtherCard();
        }
      }
        return index;                                                 
    }

  },
  resetRecord() {
    this.remainingTen = ['spades', 'hearts', 'clubs', 'diamonds']
    this.round = 0;
    this.minIndex = 0;
    this.maxIndex = 0;
    this.playerRecord = [];
    this.sortedCards = [];
    this.table_Cards = [];
    this.Turn = 0;
    this.Cycle = 0;
    this.POT = 0;
    this.card_Detail = {};
    this.initialDetails  = {};
  }

}

export { record , powerRecord };
  

