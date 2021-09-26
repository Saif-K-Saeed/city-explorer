import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

class Weather extends React.Component {

  render() {
    return (
      <Card style={{ width: "30rem" }}>
        {this.props.weather.map((value, inx) => {
          return (
            <ul key={inx}>
              <li>{value.date}  </li>
              <li>{value.description}</li>
            </ul>
          )
        })}
      </Card>
    );
  }
}
export default Weather;