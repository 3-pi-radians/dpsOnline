import React ,{ Component } from 'react';
import { Radar } from 'react-chartjs-2';
import './Profile.css';

const rnk = ['Beginner','Trainee','Dealer','Gambler','Joker','Gamester','Champion','Master','Legend','The Supreme','GOD'];

class Profile extends Component {
	constructor(props){
		super(props);
		this.state = {
			data : {},
			options : {}
		}
	}

	componentDidMount() {
		this.setLabels();
 	}

	setLabels = () => {
		let X = [];
		let Y = [];
       		let index = 0;
       		for(let i = 0; i< rnk.length;i++) {
       			if(this.props.user.rank === rnk[i]) {
       				index = i;
       				break;
       			}
       		}
       		X = ['win(%)','rank(%)','exp(%)','average ten per match(%)','rating(%)'];
       		Y = [this.props.user.winpercent,parseFloat(((index+1)*100/11).toFixed(2)),this.props.user.exp >100? 100: this.props.user.exp,(this.props.user.averageten*100/4).toFixed(2),this.props.user.rating*100/5];
       		this.setState({
       			data : {
       				labels : X,
       				datasets : [{
       					label : 'Overview in percentage',
       					backgroundColor: "#a8c0ff",
       					data : Y,
       				}]
       			},
       			options : {
						maintainAspectRatio : false,
						responsive : true,
		                scale: {
		                	ticks : {
		                		beginAtZero : true,
		                		min : 0,
		                		max : 100
		                	}
		                }
       			}
       		});
    }
	render() {
		return(
			<div className = 'BackgroundLayout'>
			  <div className = 'Profilenav'>
			    <div className = 'Home' onClick = {()=> this.props.onRouteChange('home')}>Home</div>
			    <div className = 'Username'>{`Username : ${this.props.user.username}`}</div>
			  </div>
			  <div className = 'ProfileContainer'>
			    <div className = 'Profileinfo'>{`Total Matches : ${this.props.user.matches}`}</div>
			    <div className = 'Profileinfo'>{`Matches Won : ${this.props.user.won}`}</div>
			    <div className = 'Profileinfo'>{`Matches Lost : ${this.props.user.lost}`}</div>
			    <div className = 'Profileinfo'>{`Winning Percentage : ${this.props.user.winpercent}%`}</div>
			    <div className = 'Profileinfo'>{`Average Ten per Game : ${this.props.user.averageten}`}</div>
			    <div className = 'Profileinfo'>{`Rank : ${this.props.user.rank}`}</div>
			    <div className = 'Profileinfo'>{`Average Rating : ${this.props.user.rating}`}</div>
			    <div className = 'Profileinfo'>{`Player exp : ${this.props.user.exp}`}</div>
			    <div className = 'Profileinfo'>{`Cash : ₿ ${this.props.user.cash}`}</div>
			  </div>
			  <div className = 'ChartContainer'>
			    <Radar
			    data = {this.state.data}
			    width = {400}
			    height = {400}
			    options = {this.state.options}
			    />
			  </div>	
			</div>		
		);
	}
}
export default Profile;
