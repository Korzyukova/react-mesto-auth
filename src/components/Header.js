import logo from "../images/Vector.svg"; // Путь к изображению внутри сборки
import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
  links; //Array of links
  constructor(props) {
    super(props);
    this.links = props.links;
  }
  render() {
    return (
      <header className="header">
        <img className="header__logo" alt="Надпись Место Россия" src={logo} />
        <div className="header__links">
          {this.links &&
            this.links.map((l) => {
              return (
                <Link key={l.text} className="header__link" to={l.src}>
                  {l.text}
                </Link>
              );
            })}
        </div>
      </header>
    );
  }
}

export default Header;
