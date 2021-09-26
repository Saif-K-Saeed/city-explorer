import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Movies from "./components/Movies";
import Weather from "./components/Weather";
// ////////////////////////////////////

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataForCity: {},
      nameFromInput: '',
      showCard: false,
      showWeather: false,
      weatherData: [],
      movieInformation: []
    };
  }

  getCityLocation = async (event) => {
    event.preventDefault();

    await this.setState({
      nameFromInput: event.target.city.value,
    });

    let url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.nameFromInput}&format=json`;

    let resData = await axios.get(url);
    this.setState({
      dataForCity: resData.data[0],
      showCard: true,
    });
    this.renderWeather();
    this.renderMovie();
  }
  renderWeather = async () => {
    const cityName = this.state.nameFromInput.charAt(0).toUpperCase() + this.state.nameFromInput.slice(1);
    let weatherUrl = `${process.env.REACT_APP_SERVER}getWeatherInfo?city=${cityName}`;
    let weatherCity = await axios.get(weatherUrl);
    this.setState({
      weatherData: weatherCity.data,
      showWeather: true
    })

  };
  renderMovie = async () => {
    const cityName = this.state.nameFromInput.charAt(0).toUpperCase() + this.state.nameFromInput.slice(1);
    let movieUrl = `${process.env.REACT_APP_SERVER}movies?city=${cityName}`;
    let movieData = await axios.get(movieUrl)
    this.setState({
      movieInformation: movieData.data,
    })

  }
  render() {
    return (
      <div>
        <h1>City Explorer</h1>
        <form onSubmit={this.getCityLocation}>
          <input type="text" name="city" placeholder="type city name..." />
          <input type="submit" value="Explorer!" />
        </form>
        {this.state.showCard &&
          <Card style={{ width: "30rem" }}>
            <Card.Img
              variant="top"
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.dataForCity.lat},${this.state.dataForCity.lon}&zoom=12`}
              alt="{this.state.dataForCity.display_name}" />
            <Card.Body>
              <Card.Title>{this.state.dataForCity.display_name}</Card.Title>
              <Card.Text>
                latitude: {this.state.dataForCity.lat}&nbsp;
                longitude:{"  "}{this.state.dataForCity.lon}
                <Weather weather={this.state.weatherData} />
                <Movies movies={this.state.movieInformation} />
              </Card.Text>
            </Card.Body>
          </Card>
        }
      </div>
    );
  }
}

export default App;