import React from "react";
import "../index.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
    this.tokenCheck = this.tokenCheck.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    this.tokenCheck()
  }

  handleLogin() {
    this.setState({
      loggedIn: true,
    });
  }

  tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://auth.nomoreparties.co/users/me", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data) {
            this.setState({
              loggedIn: true,
            }, () => {
              this.props.history.replace("/")
            });
          }
        })
        .catch((err) => {
          err && console.error(err);
        });
    }
  }

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.loggedIn ? <Home /> : <Redirect to="/sign-in" />}
            </Route>
            <Route exact path="/sign-up">
              {this.state.loggedIn ? <Home /> : <Register />}
            </Route>
            <Route exact path="/sign-in">
              {this.state.loggedIn ? <Home /> : <Login handleLogin={this.handleLogin} />}
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
      </>
    );
  }
}

export default withRouter(App);
