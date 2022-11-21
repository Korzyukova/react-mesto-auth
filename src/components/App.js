import React from "react";
import "../index.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Logout from "./Logout";
import InfoToolTip from "./InfoToolTip";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import { tokenCheck, signIn, signUp } from "../auth.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: "",
      isSuccessful: false,
      showPopUp: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  async componentDidMount() {
    const success = await tokenCheck();
    if (success) {
      this.setState(
        {
          loggedIn: true,
        },
        () => {
          this.props.history.replace("/");
        }
      );
    }
  }

  async handleLogin(email, password) {
    const success = await signIn(email, password);
    success
      ? this.setState({
          showPopUp: true,
          isSuccessful: true,
          loggedIn: true,
          email,
        })
      : this.setState({ showPopUp: true, loggedIn: true, email });
  }

  handleLogout() {
    this.setState({
      loggedIn: false,
      showPopUp: false,
      email: "",
      isSuccessful: false,
    });
  }

  async handleRegister(email, password) {
    const success = await signUp(this.state.email, this.state.password);
    success && window.location.assign("/sign-in");
  }

  closePopUp = () => {
    this.setState({
      showPopUp: false,
      isSuccessful: false,
    });
  };

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.loggedIn ? (
                <Home email={this.state.email} />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
            <Route exact path="/logout">
              <Logout handleLogout={this.handleLogout} />
            </Route>
            <Route exact path="/sign-up">
              {this.state.loggedIn ? (
                <Home email={this.state.email} />
              ) : (
                <Register handleRegister={this.handleRegister} />
              )}
            </Route>
            <Route exact path="/sign-in">
              {this.state.loggedIn ? (
                <Home email={this.state.email} />
              ) : (
                <Login handleLogin={this.handleLogin} />
              )}
            </Route>
            <Route>
              {this.state.loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Redirect to="/sign-in" />
              )}
            </Route>
          </Switch>
        </Router>
        {this.state.showPopUp && (
          <InfoToolTip
            isSuccessful={this.state.isSuccessful}
            onClose={this.closePopUp}
          />
        )}
      </>
    );
  }
}

export default withRouter(App);
