import React , { Component } from 'react';
import './Signup.css';

class Signup extends Component {

  constructor(props) {
	super(props);
	this.state = {
	  fullname : '',
	  username : '',	
	  email : '',
	  password : '',
    message : ''
	}
  }

  onPasswordChange = (event) => {
    this.setState({password : event.target.value});
  }
  onNameChange = (event) => {
    this.setState({fullname : event.target.value});
  }
  onEmailChange = (event) => {
    this.setState({email : event.target.value});
  }
  onUsernameChange = (event) => {
    this.setState({username : event.target.value});
  }
  checkFormValidity = () => {

    let validity = true;
    let patternMail =  /^([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*)@([a-zA-Z0-9-]+)\.([a-z]{2,18})(\.[a-z]{2,8})?$/;         // validating  email format;
    let patternPass = /^[a-zA-Z0-9!@#%$^&*?+=_-]{6,}$/;                  // validating password format;
    let patternFullname = /^([a-zA-Z]+)(\s[a-zA-Z]+)*$/;
    let patternUsername = /^[a-zA-Z0-9!@#%$^&*?+=_-]+$/

    if(patternUsername.test(this.state.username) === false){
      validity = false;
      document.querySelector('#invalidUsername').innerHTML = 'this username is not allowed';
    }  else {document.querySelector('#invalidUsername').innerHTML = ''}

    if(patternFullname.test(this.state.fullname) === false){
      validity = false;
      document.querySelector('#invalidFullname').innerHTML = 'enter a valid name';
    } else {document.querySelector('#invalidFullname').innerHTML = ''}

    if(patternMail.test(this.state.email) === false) {
      validity = false;
      document.querySelector('#invalidEmail').innerHTML = 'enter a valid email'; 
    } else {document.querySelector('#invalidEmail').innerHTML = ''}

    if(patternPass.test(this.state.password) === false) {
      validity = false;
      document.querySelector('#invaliPassword').innerHTML = "length must be atleast 6 chars and must not include {([,|.'\\:;])}";
    } else {document.querySelector('#invaliPassword').innerHTML = ''}

    return validity;
  }
  onSubmitSignup = () => {
    document.querySelector('#signupMessage').innerHTML = 'signing up.....';         // initializing
    if(this.checkFormValidity()) {
       return fetch('https://dps-online-backend.herokuapp.com/signup' , {
                method : 'post',
                headers : {'Content-Type' : 'application/json'}, 
                body : JSON.stringify({
                  email : this.state.email,
                  fullname : this.state.fullname,
                  password : this.state.password,
                  username : this.state.username
                })
               })
               .then(response => response.json())
               .then(user => {

               if(user.id) {
               this.props.onRouteChange('login');
              }
              else {
                if(user.constraint === '_email_property_clash')
                  document.querySelector('#signupMessage').innerHTML = 'this email is already taken';
                if(user.constraint === '_username_property_clash')
                  document.querySelector('#signupMessage').innerHTML = 'this username is already taken';
              }
              })
          .catch(err => {console.log(err)})
    } else {
      document.querySelector('#signupMessage').innerHTML = 'please enter valid details';
    }
  } 

  render() {
	return(
   <div className = 'signupLayout'>
	 <div className="signbox">
	  <h2>Create account</h2>
	  <div>
		<label htmlFor="fullname"> Full Name&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</label>
    <span id = 'invalidFullname' className = 'invalidEntry'></span><br />
		<input type="text" id="fullname" name="" placeholder="Full Name" onChange = {this.onNameChange} /><br />
    
		<label htmlFor="email">email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</label>   
    <span id = 'invalidEmail' className = 'invalidEntry'></span><br />
		<input type="text" id="email" name="" placeholder="em@il"  onChange = {this.onEmailChange} /><br />
      
		<label htmlFor="username">Username&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;</label>
    <span id = 'invalidUsername' className = 'invalidEntry'></span><br />
		<input type="text" id="username" name="" placeholder="Username"  onChange = {this.onUsernameChange} /><br />

		<label htmlFor="password">Password</label><br />
    <span id = 'invaliPassword' className = 'invalidEntry'></span><br />
		<input type="password" name="" placeholder="password"  onChange = {this.onPasswordChange} /><br/>

    <div id = 'signupMessage' className = 'signupMessage'></div>

		<input type="submit" name="" value="register" onClick = {this.onSubmitSignup}/>
	  </div>
    <div className = 'alreadyLogged' onClick = {()=> this.props.onRouteChange('login')}>already have an account? log in </div>
     </div>
    </div>
	);		
  }
}

export default Signup;