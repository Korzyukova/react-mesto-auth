import React from "react";
import Header from "./Header";
import { withRouter } from "react-router-dom";
import InfoToolTip from "./InfoToolTip";

class Login extends React.Component {
  headerLinks = [{ text: "Регистрация", src: "/sign-in" }];

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.state = {
      email: "",
      password: "",
      isSuccessful: false,
      showPopUp: false,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    fetch("https://auth.nomoreparties.co/signin", requestOptions)
      .then((data) => data.json())
      .then((data) => {
        if (data.token) {
          //popup class change to open here
          this.setState({ showPopUp: true, isSuccessful: true });
          localStorage.setItem("token", data.token);
        } else {
          this.setState({ showPopUp: true });
        }
      });
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  closePopUp = () => {
    this.setState(
      {
        email: "",
        password: "",
        showPopUp: false,
      },
      () => {
        if (this.state.isSuccessful) {
          this.props.handleLogin();
          this.props.history.push("/");
        }
      }
    );
  };

  render() {
    return (
      <>
        <div className="page">
          <Header links={this.headerLinks} />
          <div className="page__auth">
            <form className="page__auth_form" onSubmit={this.handleSubmit}>
              <div className="page__auth_input">
                <h1 className="page__auth_prompt">Вход</h1>
                <input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                ></input>
                <input
                  placeholder="Пароль"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                ></input>
              </div>
              <button className="page__auth_button" type="submit">
                Войти
              </button>
            </form>
          </div>
        </div>
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

export default withRouter(Login);
