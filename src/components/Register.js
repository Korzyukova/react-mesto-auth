import React from "react";
import Header from "./Header";

class Register extends React.Component {
  headerLinks = [{ text: "Войти", src: "/sign-up" }];

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit(e) {
    console.log('click')
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;


    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        password
      })
    };
    console.log(requestOptions.body)
    fetch('https://auth.nomoreparties.co/signup', requestOptions)
    .then((data) => data.json())
    .then((data) => {
      console.log(data.token)
      localStorage.setItem("token", data.token)
      window.location.assign("/")
    })
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <>
        <div className="page">
          <Header links={this.headerLinks} />
          <div className="page__auth">
            <form className="page__auth_form" onSubmit={this.handleSubmit}>
              <div className="page__auth_input">
                <h1 className="page__auth_prompt">Регистрация</h1>
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
              <button
                className="page__auth_button"
                type="submit"
              >
                Зарегистрироваться
              </button>
              <a className="page__auth_link" href="/sign-in">Уже зарегистрированы?Войти</a>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
