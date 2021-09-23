import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

class Weather extends React.Component {
  
  render() {
    return (
      <>
        <Card style={{ width: "30rem" }}>
          <Card.Body>
               
                  <Card.Text>{this.props.weatherData.date}</Card.Text>
                  <Card.Text>{this.props.weatherData.description}</Card.Text>
               
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Weather;