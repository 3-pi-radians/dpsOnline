import React from 'react';
import './Shuttable.css';

const rnk = ['Beginner','Trainee','Dealer','Gambler','Joker','Gamester','Champion','Master','Legend','The Supreme','GOD'];

class Shuttable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {           
            username : this.props.user.username,
            c : parseFloat(this.props.user.cash),
            m : parseInt(this.props.user.matches),
            e : parseFloat(this.props.user.exp),
            w : parseInt(this.props.user.won),
            l : parseInt(this.props.user.lost),
            p : parseFloat(this.props.user.winpercent),
            R : parseFloat(this.props.user.rating),
            At : parseFloat(this.props.user.averageten),
            r : this.props.user.rank,
			messageFront : '',
            g : 0,
            Rm : 0,
            cFactor : 0,
            eFactor : 0,
            pFactor : 0,
            atFactor : 0,
            rFactor : 0,
            serverPoints : 0
		}
	}
    componentDidMount() {
        this.checkWinner();
    }

    calculateFactors = () => {
        let f = 1;
        for(let n = 1; n < 100; n++) {
            if(Math.pow(10 , n) <= this.state.c && Math.pow(10,(n+1)) > this.state.c) 
            {
                f = n;
                break;
            }
        }
        this.setState(({
            cFactor : f,
            eFactor : this.state.e,
            pFactor : this.state.p*this.state.At/100,
            atFactor : this.state.At,
            rFactor : this.state.R*this.state.m
        }),()=> {this.calculateServerPoints()})
    } 

    calculateServerPoints = () => {
        //console.log('other factors ', this.state.cFactor , this.state.eFactor , this.state.pFactor , this.state.atFactor , this.state.rFactor)
        let points =  this.state.cFactor + this.state.eFactor + this.state.pFactor + this.state.atFactor + this.state.rFactor;
        this.setState(({
            serverPoints : parseFloat(points.toFixed(2))
        }),
        ()=> {
            this.updateRecord();
        })
    }

    calculateRank =  () => {
        let index = 0;
        if(this.state.e >= Math.pow(rnk.length, 2)) {
            this.calculateFactors();
        } else {
            for(let i = 0; i< rnk.length; i++) {
                if(this.state.e > Math.pow(i+1,2) && this.state.e <= Math.pow(i+2,2)) {
                    index = i;
                    break;
                } 
            }
            if(this.state.r === rnk[index])
                this.calculateFactors();
            else {
                this.setState(({
                    r : rnk[index]
                }),()=> this.calculateFactors());                    
            }
        }
    }

    calculateExp = () => {
     let per = 100 * (this.state.w)/(this.state.m);
     let ex = this.state.e + per/100;
      this.setState(({
     	p : parseFloat(per.toFixed(2)),
     	e : parseFloat(ex.toFixed(2))
     }),()=> this.calculateRank());
     // console.log('winpercent ',per);
     // console.log('exp ',ex)
    }

    calculateCash = (x , y , z , k) => {
       // console.log('matches , win , lose ,',this.state.m,this.state.w, this.state.l);
        let G = x*x + y/(z+1);
        let avgRating = 0;
        let matchRating = 0;

        let avgTen = 0;
        // console.log('G', G);

        if(G >= 6.3) {
            matchRating = 4 + (G - 6.333)/22.667;
        }
        else {
            matchRating = ((G*4)/6.333 < 1) ? 1 : (G*4)/6.333;
        }        

        avgRating = (this.state.R* (this.state.m -1) + matchRating)/this.state.m;
        avgTen = (this.state.At* (this.state.m -1) + x)/this.state.m;
        // console.log('averageten ',avgTen);
        // console.log('avgRating ', avgRating)
    	let gain = k * G;
    	let bootValue = 0.05 * this.state.c;
    	let csh = this.state.c + gain - bootValue;
    	// console.log('boot ',bootValue);
    	// console.log('gain ',gain);
     //    console.log('props',this.props)
    	// console.log(x, y, z, k)
    	csh = parseFloat(csh.toFixed(3));
    	gain = parseFloat(gain.toFixed(3));
    	// console.log(csh);
    	this.setState(({
    	  c : csh,
    	  g : gain,
          Rm : parseFloat(matchRating.toFixed(2)),
          R : parseFloat(avgRating.toFixed(2)),
          At : parseFloat(avgTen.toFixed(3))
    	}),()=> this.calculateExp());
    }
    upgradeMatches = (win) => {
    	// console.log('win ',win);
    	if(win) {
            let k = this.state.c*(0.03);
	    	this.setState(({
	    		m : this.state.m+1,
	    		w: this.state.w+1,
	    		messageFront : 'congratulations, you won !!!'
	    	}),
            ()=> this.calculateCash(
                  this.props.score.teamX.ten,
                  this.props.score.teamX.hands,
                  this.props.score.teamY.ten,
                  k
                ));
    	}
    	else {
             let k = -this.state.c*(0.007);
	     	this.setState(({
	    		m : this.state.m+1,
	    		l : this.state.l+1,
	    		messageFront : 'Bad luck, you lost !'
	    	}),
            ()=> this.calculateCash(
                  this.props.score.teamX.ten,
                  this.props.score.teamX.hands,
                  this.props.score.teamY.ten,
                k
            ));	
    	}
    }
    checkWinner = () => {
        // console.log('state of shuttable',this.state)
    	if(this.props.score.teamX.ten > this.props.score.teamY.ten) {
            this.upgradeMatches(true);
    	}
    	else
    	if(this.props.score.teamX.ten === this.props.score.teamY.ten && this.props.score.teamX.hands > this.props.score.teamY.hands) {
            this.upgradeMatches(true);   	
        }
    	else{
    		this.upgradeMatches(false);
    	}    

    }
    updateRecord = () => {
       console.log('this is serverPoints ',this.state.serverPoints);
    	console.log('displaying state',this.state); 
      return	fetch('https://dps-online-backend.herokuapp.com/shuttable' , {
    		method : 'put',
    		headers : {'Content-Type' : 'application/json'},
    		body : JSON.stringify({
				username : this.state.username,
				matches : this.state.m,
				won : this.state.w,
				lost : this.state.l,
				exp : this.state.e,
				rank  : this.state.r,
				winpercent : this.state.p,
				cash : this.state.c,
                rating : this.state.R,
                averageten : this.state.At,
                serverpoints : this.state.serverPoints
    		})
    	})
    	.then(response => response.json())
    	.then(updatedUser => {
            this.props.loadUser({
                username : this.state.username,
                matches : this.state.m,
                won : this.state.w,
                lost : this.state.l,
                exp : this.state.e,
                rank  : this.state.r,
                winpercent : this.state.p,
                cash : this.state.c,
                rating : this.state.R,
                averageten : this.state.At
        });
    		console.log(updatedUser)
    	})
    	.catch(err => console.log(err));
    }

    dispalyMessageContainer = () => {
    	if(this.state.messageFront !=='' && this.state.messageEnd !== '') {
	    	return(
	          <div>
	    	    <div className ='Message'>{`${this.state.messageFront}`}</div>
                <div className = 'Message'>{`${this.state.username}`}</div>
	    	    <div className ='gain'>
                <p>{`match value : ${this.state.g} ₿`}</p>
                <p>{`cash : ${this.state.c}`}</p>
                <p>{`match rating : ${this.state.Rm}`}</p>
                <p>{`hands/dehl : ${this.props.score.teamX.hands}/${this.props.score.teamX.ten}`}</p>
                </div>
	    	  </div>
	    	);  		
    	}
    }
      
    onHandleClick = (route) => {
        this.props.clearStatus();
        this.props.resetStates();
        this.props.resetScore();
        if(route === 'play') 
            this.props.onRouteChange('play');
        else
            this.props.onRouteChange('home')
    } 

    render() {
    	return(
    		<div className = 'Shuttable'>
    		  <input className = "back" type = 'submit' value ='Play again' onClick = {()=> this.onHandleClick('play')} />
              <input className = "home" type = 'submit' value ='Home' onClick = {()=> this.onHandleClick('home')} />
    		  <div className = 'messageContainer'>{this.dispalyMessageContainer()}</div>
    		</div>
    	);
    }
}


export default Shuttable;
