import React , { Component } from 'react';
import './Serverpos.css';

class Serverpos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message : '',
			topPlayers : [],
			myPlayer : {}
		}
	} 
    componentDidMount() {
		fetch('https://dps-online-backend.herokuapp.com/serverpos')
		.then(response => response.json())
		.then(players => {
			if(players.length > 0) {
				this.setState ({ 
					topPlayers : players,
					message : 'This is the list of top gamblers of Dehal Pakad'
				})
			} else {
				this.setState({
					message : 'Sorry for inconvenience as we cannot display the list now..'
				}) 
			}			
		})
		.catch(err => console.log('an error occured while getting players ', err)); 

		fetch(`https://dps-online-backend.herokuapp.com/serverpos/${this.props.user.username}`)
		.then(response => response.json())
		.then(player => {
			this.setState({myPlayer : player[0]});
		})   	
		.catch(err => console.log('some error occured while fetching my player',err));
    }

    showMyRank = () => {
    	if(Object.keys(this.state.myPlayer).length > 0) {
	    	return(
	    		<div className = 'Myvalues'>
	    		  {`Hello ${this.state.myPlayer.username}, your Global position is "${this.state.myPlayer.rank}" and your points are "${this.state.myPlayer.serverpoints}"`}
	    		</div>
	    	);
    	} else {
    		return(<div className = 'tc f20'>....fetching your details.........</div>);
    	}

    }

    showGlobalRank = () =>  {
    	let arr = [];
    	for(let i =0; i<5; i++) {
    		arr[i] = this.state.topPlayers[i];
    	}
    	if(this.state.topPlayers.length > 0){
		    return(
		      arr.map((player, index) => {
			     return(
			     	<div key = {index} className = 'Row'>
			     	<div className = 'Rowvalue'>{player.rank}</div>
			     	<div className = 'Rowvalue'>{player.username}</div>
			     	<div className = 'Rowvalue'>{player.serverpoints}</div>	     	
			     	</div>
			     )
		      })
		    );
    	} else {
    		return(<div className = 'ma1 pa1 tc f-3'>...Please wait....</div>)
    	}

    }

    render() {
   		return(
   			<div className = 'Serverposlayout'>
   			  <input className = "Back" type = 'submit' value ='Back' onClick = {()=> this.props.onRouteChange('home')} />
			  <div className = 'Message'> {this.state.message} </div> 
   			  <div className = 'Globalrank'>
   			  <div className = 'Titlebar'>
   			  <div className = 'Title'> Rank </div>
   			  <div className = 'Title'> Name </div>
   			  <div className = 'Title'> Points </div>
   			  </div>
   			  <div className = 'Values'>{this.showGlobalRank()}</div>
   			  </div> 
   			  <div className = 'Myrank'>{this.showMyRank()}</div>
   		    </div>
	    );
    }
}

export default Serverpos; 