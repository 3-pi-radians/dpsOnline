 const deck = {
    suit : ["spades", "hearts", "clubs", "diamonds"],
    value : ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"],
    trump : '', 
    card : [],

     createDeck() {
      let k =0;
      for(let i = 0; i<this.suit.length; i++) {
          for(let j = 0; j<this.value.length; j++) {
          	this.card.push({
              id : k,
          		cardSuit : this.suit[i],
          		cardValue : this.value[j],
              power : 13-j
            }); 
            k++;
          	}
      }
    },
    shuffle() { 
      for(let i = this.card.length - 1 ;i > 0; i--) {
        let j = Math.floor(Math.random() *i);
        [this.card[i], this.card[j]] = [this.card[j], this.card[i]]
      }
    },
   show() {
           for(let i=0; i<52;i++)
           {
           	console.log(" card  :",i+1,"  ", this.card[i].cardValue," of ", this.card[i].cardSuit);
           }
     },
     distribute(noOfPlayers,toDistribute,playerDetail) {
        let k=0;
         for(let i= 0; i< noOfPlayers; i++) {
          if(i%2 === 0)
          playerDetail[i].teamCode = "x";
          else
          playerDetail[i].teamCode = "y";

         	for(let j= 0; j< toDistribute; j++) {
         		playerDetail[i].hasCards.push(this.card[k]);
         		k++; 
         	}
         }   	
     },
      increasePower() {
        this.card.forEach(myCard => {
          if(myCard.cardSuit === this.trump)
            myCard.power += 13;
        })
      },
     emptyDeck () {
      this.card = [];
     },
     decideTrump(cardSuit) {
      this.trump = cardSuit;
     }
}
const players = {
	 noOfPlayers : 4,
	 toDistribute : 13,
	 playerDetail : [],
	addPlayerDetails() {
		for(let i = 0; i< this.noOfPlayers; i++) {
			this.playerDetail.push({
        teamCode : "",
				playerId : i+1,
				hasCards : []
			});
		}
   },
   emptyPlayerDetail() {
    this.playerDetail = [];
   }    
 }

export { deck , players };