import React, { Component, useEffect, useState } from "react";
import "./App.css";
import firebaseConfig from "./firebaseConfig";
import * as firebaseui from "firebaseui";
import firebase from "firebase";
import "firebaseui/dist/firebaseui.css";
import logo from "./images/logo+tag.jpg";
import bloodimg from "./images/Blood-img.png";

class App extends Component {
  componentDidMount() {
    const fbase = firebase.initializeApp(firebaseConfig);
    const uiConfig = {
      // signInSuccessUrl: "", //This URL is used to return to that page when we got success response for phone authentication.
      signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
      // tosUrl: "",
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  _renderCounter = () => () => {
    const [appState, setAppState] = useState("empty");

    const SignOut = () => {
      return (
        firebase.auth().currentUser && (
          <button
            className="sign-out"
            onClick={() => firebase.auth().signOut()}
          >
            Sign Out
          </button>
        )
      );
    };

    useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setAppState("edit");
        } else {
          setAppState("empty");
        }
      });
    }, []);

    return (
      <div>
        <nav>
          <div class="topnav">
            <img src={logo} alt="logo" className="logo" />
            <div class="topnav-right">
              <a href={"url"} className="hover-underline-animation">
                Find Blood Donor
              </a>
              <a href={"url"} className="hover-underline-animation">
                About
              </a>
              <a href={"url"} className="hover-underline-animation">
                Contact
              </a>
              <a href={"url"} className="hover-underline-animation">
                FAQs
              </a>
            </div>
          </div>
        </nav>
        {appState === "empty" && (
          <div>
            <div className="register">
              <p className="register-text">
                Register or Sign In for Blood Donors
              </p>
              <img src={bloodimg} alt="blood-img" className="blood-img" />
            </div>
            <div id="firebaseui-auth-container"></div>
          </div>
        )}
        {appState === "edit" && (
          <div>
            <h1>Hello</h1>
            <SignOut />
          </div>
        )}
      </div>
    );
  };

  render() {
    const MyInlineHook = this._renderCounter();
    return (
      <div className="container">
        {/* <nav>
          <div class="topnav">
            <img src={logo} alt="logo" className="logo" />
            <div class="topnav-right">
              <a href={"url"} className="hover-underline-animation">
                Find Blood Donor
              </a>
              <a href={"url"} className="hover-underline-animation">
                About
              </a>
              <a href={"url"} className="hover-underline-animation">
                Contact
              </a>
              <a href={"url"} className="hover-underline-animation">
                FAQs
              </a>
            </div>
          </div>
        </nav> */}
        {/* <div className="register">
          <p className="register-text">Register or Sign In for Blood Donors</p>
          <img src={bloodimg} alt="blood-img" className="blood-img" />
        </div>
        <div id="firebaseui-auth-container"></div> */}
        <div>
          <MyInlineHook />
        </div>
      </div>
    );
  }
}

export default App;
