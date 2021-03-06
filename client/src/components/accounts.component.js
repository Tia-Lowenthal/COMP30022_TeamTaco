/* This component (accounts.component.js) handles account registration and sign in.
- Written by Karina Reyes for COMP30022 IT Project*/
import React, { Component } from 'react';
import 'whatwg-fetch';
import './loginpage.css';
import logo from "./Assets/logo2.png"


import {
  getFromStorage,
  setInStorage,
} from '../utils/storage';

// generates a unique user ID from the date and time of creation
function generateUserId(){
    var today = new Date();
    var date = parseInt(today.getFullYear().toString()+(today.getMonth()+1).toString()+today.getDate().toString());
    var time = parseInt(today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString());
    var dateTime = date+time;
    return dateTime.toString();
}

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpFirstname: '',
      signUpLastname: ''
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstname = this.onTextboxChangeSignUpFirstname.bind(this);
    this.onTextboxChangeSignUpLastname = this.onTextboxChangeSignUpLastname.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch('/users/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  // registers input in email field when signing in
  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }
  
  // registers input in password field when signing in
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }

  // registers input in email field when registering
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }

  // registers input in password field when registering
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }

  // registers input in first name field
  onTextboxChangeSignUpFirstname(event) {
    this.setState({
      signUpFirstname: event.target.value,
    });
  }

  // registers input in last name field
  onTextboxChangeSignUpLastname(event) {
    this.setState({
      signUpLastname: event.target.value,
    });
  }

  // sends user to the home page
  handlePageChange () {
    window.location = "/home";
  }

  // sends user to sign in page
  gotoSignin () {
    window.location = "/";
  }

  // sends form information to database on registration
  onSignUp() {
    // grab state
    const {
      signUpEmail,
      signUpPassword,
      signUpFirstname,
      signUpLastname
    } = this.state;

    const userId = generateUserId();

    this.setState({
      isLoading: true,
    });

    // post request to backend
    fetch('/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        firstname: signUpFirstname,
        lastname: signUpLastname,
        userId: userId
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstname: '',
            signUpLastname: ''
          });
          
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
    //go to home page
    //this.handlePageChange();
  }

  // sends login information to database
  onSignIn() {
    // grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true
    });

    // post request to backend
    fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.handlePageChange();
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
          
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
    // go to home page
    //this.handlePageChange();
  }

  // handles the process of logging out
  logout() {
    this.setState({
      isLoading: true
    });

    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/users/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
    this.gotoSignin();
    //this.handlePageChange();
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpFirstname,
      signUpLastname,
      signUpError,
    } = this.state;

    // if (isLoading) {
    //   return (<div><p>Loading...</p></div>);
    // }
    
    if (!token) {
      return (
        
        <div className="entire-page">
          <div className="title"><img src = {logo}></img></div>
          <div className="row-sign">
            
            <div className="column1">
              {
                (signInError) ? (
                  <p>{signInError}</p>
                ) : (null)
              }
              
              <div className="subhead"><h4>Sign In</h4></div>
              <input className="form-control"
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={this.onTextboxChangeSignInEmail}
              />
              <br />
              <input className="form-control"
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
              />
              <br />
              <div ><button className="signbutton" onClick={this.onSignIn}>Sign In</button></div>
              
            </div>
            
            
            <div className="column2">
              {
                (signUpError) ? (
                  <p>{signUpError}</p>
                ) : (null)
              }
              <div className="subhead"><h4>Register</h4></div>
              <input className="form-control"
                type="email" placeholder="Email" value={signUpEmail} onChange={this.onTextboxChangeSignUpEmail}/><br />
              <input className="form-control"
                type="password" placeholder="Password" value={signUpPassword} onChange={this.onTextboxChangeSignUpPassword}/><br />
              <input className="form-control"
                type="firstname"
                placeholder="First Name"
                value={signUpFirstname}
                onChange={this.onTextboxChangeSignUpFirstname}
              /><br />
              <input className="form-control"
                type="lastname"
                placeholder="Last Name"
                value={signUpLastname}
                onChange={this.onTextboxChangeSignUpLastname}
              /><br />
              <div ><button className="signbutton" onClick={this.onSignUp}>Register</button></div>
              
            </div>
            
          </div>
        </div>
        
      );
    }

    return (null);

  }
}

export default Account;