 const deck = {
    suit : ["spades", "hearts", "clubs", "diamonds"],
    value : ["ace", "king", "queen", "jack", "10", "9", "8", "7", "6", "5", "4", "3", "2"],
    power : [0,1,2,3,4,5,6,7,8,9,10,11,12],
    trump : "", 
    card : [],
jklkl
     createDeck() {
      for(let i = 0 ; i<this.suit.length ; i++) {
          for(let j = 0 ; j<this.value.length ; j++) {
          	this.card.push({ 
          		cardSuit : this.suit[i],
          		cardValue : this.value[j]
            }); 
          	}
      }
    },
    shuffle() {
    		this.card.sort(() => Math.random() - 0.5);
      },
   show() {
           for(let i=0; i<52;i++)
           {
           	console.log(" card  :",i+1,"  ", this.card[i].cardValue," of ", this.card[i].cardSuit);
           }
     },
     distribute(noOfPlayers,toDistribute,playerDetail) {
          let k = 0;
         for(let i = 0; i< noOfPlayers;i++) {
          if(i%2 === 0){
          playerDetail[i].teamCode = "x"; 
          } else
          playerDetail[i].teamCode = "y";
         	for(let j = 0; j< toDistribute;j++) {
         		playerDetail[i].hasCards.push(this.card[k]);
         		k++;
         	}
         }   	
     }
}
const players = {
	 noOfPlayers : 0,
	 toDistribute : 0,
	 playerDetail : [],
	numberOfPlayers(strength,dist) {
		this.noOfPlayers = strength;
		this.toDistribute = dist;
	},
	addPlayerDetails() {
		for(let i = 0; i< this.noOfPlayers; i++) {
			this.playerDetail.push({
        teamCode : " ",
				playerId : i+1,
				hasCards : []
			});
		}
     },
     showPlayer() { 
        this.playerDetail.forEach((player) => {
        	console.log(player);
        });
     }        
 }
export { deck , players };