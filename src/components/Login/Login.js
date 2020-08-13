import React , { Component } from 'react';
import avatar from './profile.png'
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUserName : '',
      loginPassword : ''   
    }
  }

  onUserNameChange = (event) => {
    this.setState({loginUserName : event.target.value});
  }
  onPasswordChange = (event) => {
    this.setState({loginPassword : event.target.value});
  }
  onSubmitLogin = () => {
    document.querySelector('.message').innerHTML = 'validating....';
    if(this.state.loginUserName !== '' && this.state.loginPassword !== '') {
     return fetch('https://dps-online-backend.herokuapp.com/login' , {
      method : 'post',
      headers : {'Content-Type' : 'application/json'}, 
      body : JSON.stringify({
        username : this.state.loginUserName,
        password : this.state.loginPassword
      })
      })
      .then(response => response.json())
      .then(user => {
        if(user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
        else {
           document.querySelector('.message').innerHTML = 'invalid username or password';
        }
      })
      .catch(err => console.log(err))
    }
    else {
      document.querySelector(".message").innerHTML = "please enter all details";
    }
  } 
  render() {
    const { onRouteChange } = this.props;

      return(     
        <div className = 'loginLayout'>
        <div className="loginbox">
          <img alt = 'avatar' src={avatar}  className="profile" /><br />
          <h2>Login here</h2>
                  <div >
                    <label htmlFor="username">Username<br /></label>
                    <input id="username" type="text" name="" placeholder="Enter UserName" onChange = {this.onUserNameChange} /><br />
                    <label htmlFor="password"> Password</label><br />
                    <input type="password" id="password" name="" placeholder="Enter Password" onChange = {this.onPasswordChange} /><br />
                    <input type="submit" value="Login" onClick = {this.onSubmitLogin} /> 
                 </div>
                 <div className = 'message'></div>
              <div className = 'notLogged' onClick = {()=> onRouteChange('signup')}>Don't have an account? Sign Up.</div>
       </div>
       </div>   
  );
  }
}



export default Login;


